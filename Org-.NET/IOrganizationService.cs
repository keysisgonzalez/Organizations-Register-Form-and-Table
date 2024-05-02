using Sabio.Models.Domain.Organizations;
using Sabio.Models;
using Sabio.Models.Requests.Organizations;

namespace Sabio.Services.Interfaces
{
    public interface IOrganizationService
    {
        int Add(OrganizationAddRequest model, int currentId);
        void Update(OrganizationUpdateRequest model);
        Organization GetById(int id);
        void Delete(int id);
        Paged<Organization> GetPage(int pageIndex, int pageSize);
        Paged<Organization> GetByCreatedBy(int pageIndex, int pageSize, int createdBy);
        Paged<Organization> GetByName(int pageIndex, int pageSize, string name);
        Paged<Organization> GetByOrgType(int pageIndex, int pageSize, string organizationTypeName);
        Paged<Organization> GetByIsActive(int pageIndex, int pageSize, bool isActive);
        void Active(int id);
    }
}