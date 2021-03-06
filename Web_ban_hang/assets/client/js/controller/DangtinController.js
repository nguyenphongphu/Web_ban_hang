﻿var common = {
    init: function () {
        common.registerEvent();
        common.loadcheck();
    },
    registerEvent: function () {
        $("#sanpham a").on('click', function () {
            var id = $(this).attr('id');
            $('#MaLSP').val(id);
            if (id != null) {
                var so;
                if (id > 11 && id < 24) {
                    so = 1;
                } else if (id > 23 && id < 31) {
                    so = 2;
                } else if (id > 30 && id < 44) {
                    so = 2;
                } else {
                    so = id;
                }
                common.loaddata(so);
            }
            
        });
        
        
    },
    loadmodel: function () {
        var link =
            "<div class='form-group col-md-6'>" +
            "<label class='control-label col-md-4' for='ID_Model'> Model:</label>" +
            "<div class=' from-table col-md-7'>" +
            "<select class='form-control col-md-4' id='ID_Model'name='ID_Model'><option value=''>--Chọn--</option></select>" +
            "<span class='field-validation-valid text-danger' data-valmsg-for='ID_Model' data-valmsg-replace='true'></span>" +
            "</div>" +
            "<script type='text/javascript'>" +
            "$('#ID_Model').on('change', function () {" +
            " var value = $(this).val();" +
            "$('#SanPham_ID_Model').val(value);" +
            "});" +
            "</script> " +
            "</div>";
        $('#phantu').append(link);
        $('#IDHang').off('change').on('change', function () {
            var id = $('#IDHang').val();
            if (id != '') {              
                loadDistrict(parseInt(id));
            }
            else {
                var html = '<option value="">--Chọn--</option>';
                $('#ID_Model').html(html);          
            }
        });

        var loadDistrict = function (id) {
            $.ajax({
                url: '/DangTin/dataModel',
                data: { ma: id },
                dataType: 'json',
                type: 'POST',
                success: function (data) {                   
                    var html = '<option value="">--Chọn--</option>';
                    $.each(data.model, function (i, item) {
                        html += '<option value="' + item.ID + '">' + item.Name + '</option>'
                    });
                    $('#ID_Model').html(html);
                }
            });
        }
            
    },
    loadcheck: function () {
        $(document).ready(function () {
            var khuvuc = $('#MaKV').val();
            var malsp = $('#MaLSP').val();
            if (parseInt(khuvuc)>0) {
                console.log(khuvuc);
            }            
            if (parseInt(malsp) > 0) {
                common.loaddata(malsp);
            }
            
        });
    },
    loaddata: function (so) {
        $.ajax({
            url: '/DangTin/data',
            data: { malsp: so },
            dataType: 'json',
            type: 'POST',
            success: function (res) {
                if (res.status == true) {
                    $('#phantu').empty();
                    if (res.hang.length > 0) {
                        var data = res.hang;
                        var html = optionsl(data);
                        $('#phantu').append(mang("IDHang", "Hãng sản xuất:", html));
                        common.loadmodel();
                    }
                    if (res.models.length > 0) {
                        var data = res.models;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_Model", "Model:", html));
                    }
                    if (res.bonho.length > 0) {
                        var data = res.bonho;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_BN", "Bộ nhớ:", html));
                    }
                    if (res.boxuly.length > 0) {
                        var data = res.boxuly;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_BXL", "Bộ xử lý:", html));
                    }
                    if (res.camera.length > 0) {
                        var data = res.camera;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_Camera", "Camera:", html));
                    }
                    if (res.Case.length > 0) {
                        var data = res.Case;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_Case", "Case:", html));
                    }
                    if (res.Chatlieu.length > 0) {
                        var data = res.Chatlieu;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_CL", "Chất liệu:", html));
                    }
                    if (res.chongoi.length > 0) {
                        var data = res.chongoi;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_CN", "Chỗ ngồi:", html));
                    }
                    if (res.doisanxuat.length > 0) {
                        var data = res.doisanxuat;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_Doi", "Đời sản xuất:", html));
                    }
                    if (res.dophangia.length > 0) {
                        var data = res.dophangia;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_DPG", "Độ phân giải:", html));
                    }
                    if (res.hedieuhanh.length > 0) {
                        var data = res.hedieuhanh;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_HDH", "Hệ điều hành:", html));
                    }
                    if (res.hopso.length > 0) {
                        var data = res.hopso;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_HS", "Hộp số:", html));
                    }
                    if (res.kichthuoc.length > 0) {
                        var data = res.kichthuoc;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_KT", "Kích thước:", html));
                    }
                    if (res.kieudang.length > 0) {
                        var data = res.kieudang;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_KD", "Kiểu dáng:", html));
                    }
                    if (res.loaiTR.length > 0) {
                        var data = res.loaiTR;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_LTR", "Loại thời trang:", html));
                    }
                    if (res.mausac.length > 0) {
                        var data = res.mausac;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_MS", "Màu sắc:", html));
                    }
                    if (res.Mua.length > 0) {
                        var data = res.Mua;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_M", "Mùa:", html));
                    }
                    if (res.phukien.length > 0) {
                        var data = res.phukien;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_PK", "Phụ kiện:", html));
                    }
                    if (res.pin.length > 0) {
                        var data = res.pin;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_Pin", "Pin:", html));
                    }
                    if (res.quangduong.length > 0) {
                        var data = res.quangduong;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_QD", "Quảng đường:", html));
                    }
                    if (res.ram.length > 0) {
                        var data = res.ram;
                        var html = optionsl(data);
                        $('#phantu').append(mang("ID_R", "Ram:", html));
                    }
                }
            },
            error: function (e) {
                alert("co loi " + e.statusText);
            }
        });
        var mang = function (a, b, html) {
            var link =
                "<div class='form-group col-md-6'>" +
                "<label class='control-label col-md-4' for='" + a + "'>" + b + "</label>" +
                "<div class=' from-table col-md-7'>" +
                "<select class='form-control col-md-4' id='" + a + "'name='" + a + "'>" + html + "</select>" +
                "<span class='field-validation-valid text-danger' data-valmsg-for='" + a + "' data-valmsg-replace='true'></span>" +
                "</div>" +
                "<script type='text/javascript'>" +
                "$('#" + a + "').on('change', function () {" +
                " var value = $(this).val();" +
                "$('#SanPham_" + a + "').val(value);" +
                "});" +
                "</script> " +
                "</div>";
            return link;
        }
        var optionsl = function (data) {
            var html = '<option value="">--Chọn--</option>';
            $.each(data, function (i, item) {
                html += '<option value="' + item.ID + '">' + item.Name + '</option>'
            });
            return html;
        }

    }
}
common.init();

