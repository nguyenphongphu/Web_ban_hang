namespace Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DonHang")]
    public partial class DonHang
    {
        [Key]
        public int ID_DH { get; set; }

        public int MaSP { get; set; }

        public int UserID { get; set; }

        [Column(TypeName = "date")]
        public DateTime date { get; set; }

        public decimal? Gia { get; set; }

        public int soluong { get; set; }

        public decimal? Thanhtien { get; set; }

        public bool Status { get; set; }

        public int? MaKV { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Diachi { get; set; }

        [StringLength(10)]
        public string Phone { get; set; }

        [StringLength(50)]
        public string email { get; set; }

        public virtual Khuvuc Khuvuc { get; set; }

        public virtual SanPham SanPham { get; set; }

        public virtual Taikhoan Taikhoan { get; set; }
    }
}
