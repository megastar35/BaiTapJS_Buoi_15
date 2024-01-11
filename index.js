function formatVND(n) {
    var giaTri = n * 1
    giaTri = giaTri.toLocaleString({
        style: 'currency',
        currency: 'VND',
    }) + ' VNĐ';
    return giaTri;
}

// Bai tập 1
// Khu vực: A = 2, B = 1, C = 0.5
// Đối tượng: 1 = 2.5, 2 = 1.5, 3 = 1

// lưu ý rút ra được: 
// nếu điểm môn để ngoài sự kiện onclick sẽ không lấy được giá trị tham chiếu của người dùng nhập vào
// 1 hàm chỉ nên xử lý chức năng đơn giản của nó thôi, 
var divThongBao = document.querySelector('#alert_bai1');

document.getElementById("KetQuaDau").onclick = function () {
    let diemMon1 = document.getElementById('mon1').value * 1;
    let diemMon2 = document.getElementById('mon2').value * 1;
    let diemMon3 = document.getElementById('mon3').value * 1;
    var diemChuan = document.getElementById('DiemChuan').value * 1

    var DiemLiet = checkDiemLiet(diemMon1, diemMon2, diemMon3)
    var diemTongKet = tinhDiemTongKet(diemMon1, diemMon2, diemMon3)
    // yêu cầu nhập điểm chuẩn
    if (diemChuan <= 0) {
        alert("Vui lòng nhập điểm chuẩn")
        return null;
    } else {
        // kiểm tra trong 3 môn có môn 0 điểm hay không
        if (DiemLiet) {
            divThongBao.innerHTML = 'Bạn đã rớt do có điểm nhỏ hơn hoặc bằng 0'
            divThongBao.classList.remove('d-none');
            console.log(DiemLiet);
            return -1;
        } else if (!DiemLiet) {
            console.log(diemTongKet);
            if (diemTongKet >= diemChuan) {
                divThongBao.innerHTML = 'Chúc mừng bạn đã đậu'
                divThongBao.classList.remove('d-none')
                divThongBao.classList.remove('alert-danger')
                divThongBao.classList.add('alert-success')
            } else if (diemTongKet < diemChuan) {
                divThongBao.innerHTML = 'Bạn đã rớt, chúc bạn may mắn năm sau'
                divThongBao.classList.remove('d-none')
                divThongBao.classList.remove('alert-success')
                divThongBao.classList.add('alert-danger')
            }
            return diemTongKet
        }
    }
}
function checkDiemLiet(diemMon1, diemMon2, diemMon3) {
    if (diemMon1 <= 0 || diemMon2 <= 0 || diemMon3 <= 0) {
        return true;
    }
    return false
}
function tinhDiemTongKet(diemMon1, diemMon2, diemMon3) {
    // 3 môn cộng lại và cộng thêm điểm ưu tiên Khu vực, Đối tượng
    var diemKhuVuc = checkKhuVucUuTien();
    var diemDoiTuong = checkDoiTuongUuTien();
    var diemTongKet = 0;

    diemTongKet = diemMon1 + diemMon2 + diemMon3 + diemKhuVuc + diemDoiTuong;
    return diemTongKet


}

function checkKhuVucUuTien() {
    var khuVuc = document.querySelector("#KhuVuc").value
    var diem = 0;
    if (khuVuc == "khuVucA") {
        return diem = 2;
    } else if (khuVuc == "khuVucB") {
        return diem = 1;
    } else if (khuVuc == "khuVucC") {
        return diem = 0.5;
    }
    return 0
}
function checkDoiTuongUuTien() {
    var khuVuc = document.querySelector("#DoiTuong").value
    var diem = 0;
    if (khuVuc == "doiTuong1") {
        return diem = 2.5;
    } else if (khuVuc == "doiTuong2") {
        return diem = 1.5;
    } else if (khuVuc == "doiTuong3") {
        return diem = 1;
    }
    return 0
}

// Bài tập 2
// Tính và xuất tiền trả theo quy định
// 50kw đầu: 500d/kw
// 50kw kế:  650d/kw
// 100kw kế: 850d/kw
// 150kw kế: 1100d/kw
// còn lại:  1300d/kw
const kw0Den50 = 500;
const kw50Den100 = 650;
const kw100Den200 = 850;
const kw200Den350 = 1100;
const kw350TroLen = 1300
document.getElementById("TinhTienDien").onclick = function () {
    var soKW = document.getElementById("soKW").value * 1
    var hoTen = document.getElementById("hoTen").value
    var nguoiTieuThu = document.getElementById("TenNguoiTieuThu")

    var tienDien = document.getElementById("TongTienDien");
    nguoiTieuThu.innerHTML = `Họ Tên: ${hoTen}; `
    tienDien.innerHTML = ` Tiền điện ${formatVND(tinhTienDien(soKW))}`
}

function tinhTienDien(soKW) {
    if (soKW <= 50) {
        return kw0Den50 * soKW
    } else if (soKW > 50 && soKW <= 100) {
        return kw0Den50 * 50 + (soKW - 50) * kw50Den100
    } else if (soKW > 100 && soKW <= 200) {
        return (kw0Den50 * 50) + (50 * kw50Den100) + (soKW - 100) * kw100Den200
    } else if (soKW > 200 && soKW <= 350) {
        return (kw0Den50 * 50) + (50 * kw50Den100) + (100 * kw100Den200) + (soKW - 200) * kw200Den350
    } else if (soKW > 350) {
        return (kw0Den50 * 50) + (50 * kw50Den100) + (100 * kw100Den200) + (150 * kw200Den350) + (soKW - 350) * kw350TroLen
    }
}

// Bài tập 3
// Tính thuế thu nhập cá nhân
const thuNhap60 = 0.05
const thuNhap60Den120 = 0.1
const thuNhap120Den210 = 0.15
const thuNhap210Den384 = 0.2
const thuNhap384Den624 = 0.25
const thuNhap624Den960 = 0.3
const thuNhapTren960 = 0.35

document.getElementById("TinhTienThue").onclick = function () {
    let thuNhapNam = document.getElementById("thuNhapNam").value * 1;
    let soNguoiPhuThuoc = document.getElementById("soNguoiPhuThuoc").value * 1;
    let hoTen = document.getElementById("hoTen_nguoiNopThue").value;
    var printTienThue = document.getElementById("thueThuNhapCaNhan")
    let thueCaNhan = tinhThueCaNhan(tinhThuNhapChiuThue(thuNhapNam, soNguoiPhuThuoc))
    console.log(thueCaNhan);
    printTienThue.innerHTML = `Họ Tên: ${hoTen} ; Tiền thuế thu nhập cá nhân: ${formatVND(thueCaNhan)}`
}

function tinhThuNhapChiuThue(thuNhapNam, soNguoiPhuThuoc) {
    // thu nhập năm hơn 10trieu
    if (thuNhapNam < 1e+7) {
        alert("Số tiền thu nhập không hợp lệ")
    }
    return thuNhapNam - 4e+6 - (soNguoiPhuThuoc * 1.6e+6)
}
function tinhThueCaNhan(thuNhapChiuThue) {
    if (thuNhapChiuThue <= 6e+7) {
        return thuNhapChiuThue * thuNhap60
    } else if (thuNhapChiuThue > 6e+7 && thuNhapChiuThue <= 12e+7) {
        return thuNhapChiuThue * thuNhap60Den120
    } else if (thuNhapChiuThue > 12e+7 && thuNhapChiuThue <= 21e+7) {
        return thuNhapChiuThue * thuNhap120Den210
    } else if (thuNhapChiuThue > 21e+7 && thuNhapChiuThue <= 384e+6) {
        return thuNhapChiuThue * thuNhap210Den384
    } else if (thuNhapChiuThue > 384e+6 && thuNhapChiuThue <= 624e+6) {
        return thuNhapChiuThue * thuNhap384Den624
    } else if (thuNhapChiuThue > 624e+6 && thuNhapChiuThue <= 960e+6) {
        return thuNhapChiuThue * thuNhap624Den960
    } else return thuNhapChiuThue * thuNhapTren960
}

// bài tập 4
// tính tiền cáp
const phiHoaDonNhaDan = 4.5
const phiHoaDonDoanhNghiep = 15
const kenhCaoCapNhaDan = 7.5
const kenhCaoCapDoanhNghiep = 50
const phiCoBanNhaDan = 20.5
const phiCoBanDoanhNghiep = 75
function checkLoaiKhachHang() {
    var loaiKH = document.getElementById('seleLoaiKH').value
    if (loaiKH == "DoanhNghiep") {
        document.getElementById('soKetNoi').classList.remove('d-none')
        // console.log(loaiKH);
        return loaiKH
    } else {
        document.getElementById('soKetNoi').classList.add('d-none')
        // console.log(loaiKH);
        return loaiKH
    }
}
document.getElementById('tinhTienCap').onclick = function tinhTienCap() {
    var loaiKhachHang = checkLoaiKhachHang()
    var soKenhCaoCap = document.getElementById("kenhCaoCap").value * 1
    var soKetNoi = document.getElementById("soKetNoi").value * 1
    var tongTienCap = 0
    var maKH = document.getElementById("maKhachHang").value
    if (loaiKhachHang == "") {
        alert("Vui lòng chọn loại khách hàng")
    } else {
        if (kenhCaoCap < 0 || soKetNoi < 0) {
            alert("số nhập phải là số dương hoặc 0")
            return -1;
        } else {
            switch (loaiKhachHang) {
                case "DoanhNghiep":
                    tongTienCap = phiCoBanDoanhNghiep + phiHoaDonDoanhNghiep + (soKenhCaoCap * kenhCaoCapDoanhNghiep)
                    if (soKetNoi > 10) tongTienCap += (soKetNoi - 10) * 5
                    break;
                case "NhaDan":
                    tongTienCap = phiCoBanNhaDan + phiHoaDonNhaDan + (soKenhCaoCap * kenhCaoCapNhaDan)
                    break;
                default:
                    break;
            }
            document.getElementById("tongTienCap").innerHTML = `Mã khách hàng: ${maKH}; Tiền cáp  $${tongTienCap}`
        }
    }
}
