﻿namespace Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LoaiTR")]
    public partial class LoaiTR
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LoaiTR()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        public int ID_LTR { get; set; }

        [StringLength(50)]
        [Display(Name = "Loại thời trang:")]
        public string Ten { get; set; }

        [Display(Name = "Loại sản phẩm: ")]
        public int? MaLSP { get; set; }

        public int? STT { get; set; }

        public virtual LoaiSanPham LoaiSanPham { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
