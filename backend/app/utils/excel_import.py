import pandas as pd
from typing import List, Dict

# Robust parsing utility for the Excel structure you provided.
# Attempts to map common column names (both letter and Persian/English headers).
COL_MAP = {
    'B': 'category', 'C': 'code', 'D': 'serial', 'E': 'title', 'G': 'unit',
    'R': 'stock', 'Aa': 'last_purchase_price', 'Ab': 'last_sale_price',
    'Aq': 'retail_price', 'Ar': 'wholesale_price', 'At': 'tax_flag'
}
ALT_NAMES = {
    'گروه کالا': 'category', 'کد': 'code', 'سریال': 'serial', 'نام کالا': 'title',
    'واحد': 'unit', 'موجودی': 'stock', 'آخرين في خريد': 'last_purchase_price',
    'آخرين في فروش': 'last_sale_price', 'في خرده': 'retail_price', 'في جمله': 'wholesale_price',
    'عيد': 'tax_flag'
}

def normalize_column_name(name: str):
    if name is None:
        return None
    name = str(name).strip()
    if name in COL_MAP:
        return COL_MAP[name]
    if name in ALT_NAMES:
        return ALT_NAMES[name]
    # lower/english fallback
    lowered = name.lower()
    if lowered in ('category','code','serial','title','unit','stock','last_purchase_price','last_sale_price','retail_price','wholesale_price','tax_flag'):
        return lowered
    return name

def parse_excel(path: str) -> List[Dict]:
    df = pd.read_excel(path, dtype=str)
    # build mapping from file columns to our canonical names
    col_map = {}
    for col in df.columns:
        mapped = normalize_column_name(col)
        col_map[col] = mapped or col
    rows = []
    for _, r in df.iterrows():
        out = {}
        for col, mapped in col_map.items():
            out[mapped] = r.get(col) if col in r.index else None
        # coerce numeric-ish fields
        try:
            out['stock'] = int(float(out.get('stock') or 0))
        except Exception:
            out['stock'] = 0
        def to_float(k):
            try:
                return float(out.get(k)) if out.get(k) not in (None, '') else None
            except Exception:
                return None
        out['last_purchase_price'] = to_float('last_purchase_price')
        out['last_sale_price'] = to_float('last_sale_price')
        out['retail_price'] = to_float('retail_price')
        out['wholesale_price'] = to_float('wholesale_price')
        rows.append(out)
    return rows
