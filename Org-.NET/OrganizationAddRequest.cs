using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Organizations
{
    public class OrganizationAddRequest
    {
        [Required]
        public int OrganizationTypeId { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Headline { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Description { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Logo { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int LocationId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Phone { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string SiteUrl { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public DateTime DateModified { get; set; }

        [Required]
        public bool Active { get; set; }

    }
}
