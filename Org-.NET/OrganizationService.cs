using Microsoft.AspNetCore.Http.HttpResults;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Locations;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Numerics;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class OrganizationService : IOrganizationService
    {
        IDataProvider _data = null;
        ILookUpService _lookUp = null;

        public OrganizationService(IDataProvider data, ILookUpService lookUp)
        {
            _data = data;
            _lookUp = lookUp;
        }
        
        #region DELETE BY ID
        public void Delete(int id)
        {
            string procName = "[dbo].[Organizations_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);

        } 
        #endregion

        #region GET BY ID
        public Organization GetById(int id)
        {
            Organization organization = null;

            string procName = "[dbo].[Organizations_Select_ById]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                organization = MapSingleOrg(reader, ref index);
            });

            return organization;
        } 
        #endregion

        #region UPDATE
        public void Update(OrganizationUpdateRequest model)
        {
            string procName = "[dbo].[Organizations_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null
            );
        } 
        #endregion

        #region INSERT
        public int Add(OrganizationAddRequest model, int currentId)
        {
            int id = 0;

            string procName = "[dbo].[Organizations_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", currentId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object objId = returnCol["@Id"].Value;

                int.TryParse(objId.ToString(), out id);
            }
            );

            return id;
        }
        #endregion

        #region GET BY CREATED BY
        public Paged<Organization> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Organization> pagedList = null;
            List<Organization> orgList = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@CreatedBy", createdBy);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Organization org = MapSingleOrg(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (orgList == null)
                {
                    orgList = new List<Organization>();
                }
                orgList.Add(org);
            });

            if (orgList != null)
            {
                pagedList = new Paged<Organization>(orgList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        #region PAGINATION
        public Paged<Organization> GetPage(int pageIndex, int pageSize)
        {
            Paged<Organization> pagedList = null;
            List<Organization> orgList = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Organization org = MapSingleOrg(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (orgList == null)
                {
                    orgList = new List<Organization>();
                }
                orgList.Add(org);
            });

            if (orgList != null)
            {
                pagedList = new Paged<Organization>(orgList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        #region GET BY NAME PAGINATED
        public Paged<Organization> GetByName(int pageIndex, int pageSize, string name)
        {
            Paged<Organization> pagedList = null;
            List<Organization> orgList = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_Select_ByName]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Name", name);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Organization org = MapSingleOrg(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (orgList == null)
                {
                    orgList = new List<Organization>();
                }
                orgList.Add(org);
            });

            if (orgList != null)
            {
                pagedList = new Paged<Organization>(orgList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        #region GET BY TYPE PAGINATED
        public Paged<Organization> GetByOrgType(int pageIndex, int pageSize, string organizationTypeName)
        {
            Paged<Organization> pagedList = null;
            List<Organization> orgList = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_Select_ByOrgType]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@OrganizationTypeName", organizationTypeName);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Organization org = MapSingleOrg(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (orgList == null)
                {
                    orgList = new List<Organization>();
                }
                orgList.Add(org);
            });

            if (orgList != null)
            {
                pagedList = new Paged<Organization>(orgList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        #region ACTIVE
        public void Active(int id)
        {
            string procName = "[dbo].[Organizations_Active]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);

        }
        #endregion

        #region GET BY IS ACTIVE
        public Paged<Organization> GetByIsActive(int pageIndex, int pageSize, bool isActive)
        {
            Paged<Organization> pagedList = null;
            List<Organization> orgList = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_Select_ByIsActive]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@IsActive", isActive);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Organization org = MapSingleOrg(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (orgList == null)
                {
                    orgList = new List<Organization>();
                }
                orgList.Add(org);
            });

            if (orgList != null)
            {
                pagedList = new Paged<Organization>(orgList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        #region COMMON PARAMS
        private static void AddCommonParams(OrganizationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Logo", model.Logo);
            col.AddWithValue("@LocationId", model.LocationId);
            col.AddWithValue("@Phone", model.Phone);
            col.AddWithValue("@SiteUrl", model.SiteUrl);
            col.AddWithValue("@Active", model.Active);
        } 
        #endregion

        #region SINGLE MAPPER
        private Organization MapSingleOrg(IDataReader reader, ref int index)
        {
            Organization org = new Organization();

            org.Id = reader.GetSafeInt32(index++);
            org.OrganizationTypeId = _lookUp.MapSingleLookUp(reader, ref index);
            org.Name = reader.GetSafeString(index++);
            org.Headline = reader.GetSafeString(index++);
            org.Description = reader.GetSafeString(index++);
            org.Logo = reader.GetSafeString(index++);
            org.LocationInfo = reader.DeserializeObject<BaseLocation>(index++);
            org.Phone = reader.GetSafeString(index++);
            org.SiteUrl = reader.GetSafeString(index++);
            org.CreatedBy = reader.DeserializeObject<BaseUser>(index++);
            org.Active = reader.GetSafeBool(index++);

            return org;
        } 
        #endregion
    }
}
