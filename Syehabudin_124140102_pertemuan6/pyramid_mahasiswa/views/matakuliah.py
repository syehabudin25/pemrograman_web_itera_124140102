from pyramid.view import view_config

from ..models import Matakuliah


def _positive_int(value):
    """Kembalikan nilai sebagai integer positif, atau None jika tidak valid."""
    try:
        number = int(value)
    except (TypeError, ValueError):
        return None
    return number if number > 0 else None


def _json_body(request):
    """Ambil body JSON, atau dict kosong jika body tidak valid."""
    try:
        data = request.json_body
    except ValueError:
        return {}
    return data if isinstance(data, dict) else {}


def _get_matakuliah(request):
    """Cari matakuliah berdasarkan id di URL, atau None jika tidak ada."""
    item_id = _positive_int(request.matchdict['id'])
    if item_id is None:
        return None
    return (
        request.dbsession.query(Matakuliah)
        .filter_by(id=item_id)
        .first()
    )


def _not_found(request):
    request.response.status = 404
    return {'success': False, 'message': 'Data matakuliah tidak ditemukan'}


def _bad_request(request, message):
    request.response.status = 400
    return {'success': False, 'message': message}


@view_config(
    route_name='matakuliah_list', renderer='json', request_method='GET'
)
def matakuliah_list(request):
    items = request.dbsession.query(Matakuliah).order_by(Matakuliah.id).all()
    return {
        'success': True,
        'data': [item.to_dict() for item in items],
    }


@view_config(
    route_name='matakuliah_detail', renderer='json', request_method='GET'
)
def matakuliah_detail(request):
    item = _get_matakuliah(request)
    if item is None:
        return _not_found(request)
    return {'success': True, 'data': item.to_dict()}


@view_config(
    route_name='matakuliah_add', renderer='json', request_method='POST'
)
def matakuliah_add(request):
    data = _json_body(request)
    kode_mk = str(data.get('kode_mk') or '').strip()
    nama_mk = str(data.get('nama_mk') or '').strip()

    if not kode_mk:
        return _bad_request(request, 'Field kode_mk wajib diisi!')
    if not nama_mk:
        return _bad_request(request, 'Field nama_mk wajib diisi!')
    if data.get('sks') in (None, ''):
        return _bad_request(request, 'Field sks wajib diisi!')
    if data.get('semester') in (None, ''):
        return _bad_request(request, 'Field semester wajib diisi!')

    sks = _positive_int(data.get('sks'))
    semester = _positive_int(data.get('semester'))
    if sks is None:
        return _bad_request(request, 'Field sks harus lebih dari 0')
    if semester is None:
        return _bad_request(request, 'Field semester harus lebih dari 0')

    existing = (
        request.dbsession.query(Matakuliah)
        .filter_by(kode_mk=kode_mk)
        .first()
    )
    if existing is not None:
        return _bad_request(request, f'kode_mk {kode_mk} sudah terdaftar')

    item = Matakuliah(
        kode_mk=kode_mk, nama_mk=nama_mk, sks=sks, semester=semester
    )
    request.dbsession.add(item)
    request.dbsession.flush()
    return {
        'success': True,
        'message': 'Matakuliah berhasil ditambahkan',
        'data': item.to_dict(),
    }


@view_config(
    route_name='matakuliah_update', renderer='json', request_method='PUT'
)
def matakuliah_update(request):
    item = _get_matakuliah(request)
    if item is None:
        return _not_found(request)

    data = _json_body(request)

    if 'kode_mk' in data:
        kode_mk = str(data['kode_mk'] or '').strip()
        if not kode_mk:
            return _bad_request(request, 'Field kode_mk tidak boleh kosong')
        item.kode_mk = kode_mk

    if 'nama_mk' in data:
        nama_mk = str(data['nama_mk'] or '').strip()
        if not nama_mk:
            return _bad_request(request, 'Field nama_mk tidak boleh kosong')
        item.nama_mk = nama_mk

    if 'sks' in data:
        sks = _positive_int(data['sks'])
        if sks is None:
            return _bad_request(request, 'Field sks harus lebih dari 0')
        item.sks = sks

    if 'semester' in data:
        semester = _positive_int(data['semester'])
        if semester is None:
            return _bad_request(request, 'Field semester harus lebih dari 0')
        item.semester = semester

    return {
        'success': True,
        'message': 'Matakuliah berhasil diperbarui',
        'data': item.to_dict(),
    }


@view_config(
    route_name='matakuliah_delete', renderer='json', request_method='DELETE'
)
def matakuliah_delete(request):
    item = _get_matakuliah(request)
    if item is None:
        return _not_found(request)

    request.dbsession.delete(item)
    return {'success': True, 'message': 'Matakuliah berhasil dihapus'}