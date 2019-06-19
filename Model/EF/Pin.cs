﻿namespace Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Pin")]
    public partial class Pin
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Pin()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        public int ID_Pin { get; set; }

        [StringLength(50)]
        [Display(Name = "Pin:")]
        public string Ten { get; set; }

        [Display(Name = "Loại sản phẩm: ")]
        public int? MaLSP { get; set; }

        public int? STT { get; set; }

        public virtual LoaiSanPham LoaiSanPham { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
