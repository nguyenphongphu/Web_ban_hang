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
                var name = $(this).html;
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
                                $('#phantu').append(mang("IDHang", "Hãng sản xuất:", html, name));
                                common.loadmodel();
                            }
                            if (res.models.length > 0) {
                                var data = res.models;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_Model", "Model:", html, id));
                            }
                            if (res.bonho.length > 0) {
                                var data = res.bonho;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_BN", "Bộ nhớ:", html, id));
                            }
                            if (res.boxuly.length > 0) {
                                var data = res.boxuly;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_BXL", "Bộ xử lý:", html, id));
                            }
                            if (res.camera.length > 0) {
                                var data = res.camera;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_Camera", "Camera:", html, id));
                            }
                            if (res.Case.length > 0) {
                                var data = res.Case;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_Case", "Case:", html, id));
                            }
                            if (res.Chatlieu.length > 0) {
                                var data = res.Chatlieu;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_CL", "Chất liệu:", html, id));
                            }
                            if (res.chongoi.length > 0) {
                                var data = res.chongoi;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_CN", "Chỗ ngồi:", html, id));
                            }
                            if (res.doisanxuat.length > 0) {
                                var data = res.doisanxuat;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_Doi", "Đời sản xuất:", html, id));
                            }
                            if (res.dophangia.length > 0) {
                                var data = res.dophangia;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_DPG", "Độ phân giải:", html, id));
                            }
                            if (res.hedieuhanh.length > 0) {
                                var data = res.hedieuhanh;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_HDH", "Hệ điều hành:", html, id));
                            }
                            if (res.hopso.length > 0) {
                                var data = res.hopso;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_HS", "Hộp số:", html, id));
                            }
                            if (res.kichthuoc.length > 0) {
                                var data = res.kichthuoc;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_KT", "Kích thước:", html, id));
                            }
                            if (res.kieudang.length > 0) {
                                var data = res.kieudang;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_KD", "Kiểu dáng:", html, id));
                            }
                            if (res.loaiTR.length > 0) {
                                var data = res.loaiTR;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_LTR", "Loại thời trang:", html, id));
                            }
                            if (res.mausac.length > 0) {
                                var data = res.mausac;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_MS", "Màu sắc:", html, id));
                            }
                            if (res.Mua.length > 0) {
                                var data = res.Mua;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_M", "Mùa:", html, id));
                            }
                            if (res.phukien.length > 0) {
                                var data = res.phukien;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_PK", "Phụ kiện:", html, id));
                            }
                            if (res.pin.length > 0) {
                                var data = res.pin;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_Pin", "Pin:", html, id));
                            }
                            if (res.quangduong.length > 0) {
                                var data = res.quangduong;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_QD", "Quảng đường:", html, id));
                            }
                            if (res.ram.length > 0) {
                                var data = res.ram;
                                var html = optionsl(data);
                                $('#phantu').append(mang("ID_R", "Ram:", html, id));
                            }
                        }
                    },
                    error: function (e) {
                        alert("co loi " + e.statusText);
                    }
                });
            }
            
        });
        
        var mang = function (a, b, html, id) {
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
        var optionsl = function(data){
            var html = '<option value="">--Chọn--</option>';
            $.each(data, function (i, item) {               
                html += '<option value="' + item.ID + '">' + item.Name + '</option>'
            });
            return html;
        }    
        
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
        $("form").on("submit", function () {

            var has_empty = false;
            var khuvuc = $('#MaKV').val();
            var tieude = $('#TieuDe').val();
            var mota = $('#Mota').val();
            var gia = $('#GiaBan').val();
            var malsp = $('#MaLSP').val();
            if (khuvuc.trim() != null) {
                has_empty = true;
            } else {
                alert("chua chon khu vuc");
            }
            if (tieude.trim() != null) {
                has_empty = true;
            } else {
                alert("tieu đề không được trống");
            }
            if (mota.trim() != null) {
                has_empty = true;
            } else {
                alert("Mô tảkhông được trống");
            }
            if (gia.trim() != null) {
                has_empty = true;
            } else {
                alert("Giá không được trống");
            }
            if (malsp.trim() != null) {
                has_empty = true;
            } else {
                alert("Chưa chọn loại sản phẩm");
            }
            return has_empty;
        });
       
    }
}
common.init();

