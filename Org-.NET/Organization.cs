using Sabio.Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Models.Domain.Organizations
{
    public class Organization
    {
        public int Id { get; set; }
        public LookUp OrganizationTypeId { get; set; } 
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public BaseLocation LocationInfo { get; set; }
        public string Phone { get; set; }
        public string SiteUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModifed { get; set; }
        public BaseUser CreatedBy { get; set; }  
        public bool Active { get; set; }
      
        
    }
}
