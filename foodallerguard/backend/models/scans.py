# In-memory scan storage
scans_db = []

def save_scan(scan_data):
    """Save a scan to the database"""
    scans_db.append(scan_data)
    return scan_data

def get_scans():
    """Get all scans"""
    return scans_db

def clear_scans():
    """Clear all scans"""
    scans_db.clear()

