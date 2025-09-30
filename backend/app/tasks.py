from celery import Celery
from .core import settings
from .utils.excel_import import parse_excel
from .crud import get_product_by_serial, create_product, update_product_from_dict
from sqlmodel import create_engine, Session, SQLModel
from .models import Product
from .schemas import ProductCreate

celery = Celery(__name__, broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_RESULT_BACKEND)

engine = create_engine(settings.DATABASE_URL, echo=False)

@celery.task(bind=True)
def import_excel_task(self, filepath: str):
    rows = parse_excel(filepath)
    created = 0
    updated = 0
    errors = 0
    details = []
    with Session(engine) as session:
        for r in rows:
            try:
                serial = r.get('serial') or r.get('سریال') or r.get('Serial')
                if not serial or str(serial).strip() == '':
                    errors += 1
                    details.append({'row': r, 'error': 'no serial'})
                    continue
                prod = get_product_by_serial(session, str(serial))
                obj = {k: v for k, v in r.items() if k in ('category','code','serial','title','unit','stock','last_purchase_price','last_sale_price','retail_price','wholesale_price','tax_flag')}
                if prod:
                    update_product_from_dict(session, prod, obj)
                    updated += 1
                else:
                    pcreate = ProductCreate(**{k:v for k,v in obj.items() if k!='images'})
                    create_product(session, pcreate)
                    created += 1
            except Exception as e:
                errors += 1
                details.append({'row': r, 'error': str(e)})
    return {'created': created, 'updated': updated, 'errors': errors, 'details': details}
