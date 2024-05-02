using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/organizations")]
    [ApiController]
    public class OrganizationApiController : BaseApiController
    {
        private IOrganizationService _service = null;
        private IAuthenticationService<int> _authService = null;

        public OrganizationApiController(IOrganizationService service,
           ILogger<OrganizationApiController> logger,
            IAuthenticationService<int> authService): base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region HttpPut

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(OrganizationUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int currentId = _authService.GetCurrentUserId();

            try
            {
                _service.Update(model);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"SqlException Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }
        #endregion

        #region HttpPost
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(OrganizationAddRequest model)
        {
            ObjectResult result = null;
            int currentId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.Add(model, currentId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

                result = StatusCode(500, response);
            }

            return result;
        }
        #endregion

        #region HttpDelete
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        #endregion

        #region HttpGet By Id
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Organization>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Organization organization = _service.GetById(id);
                if (organization == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Organization> { Item = organization };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        #endregion

        #region HttpGet("paginate")
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Organization> page = _service.GetPage(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Organization>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }
        #endregion

        #region HttpGet("createdby")
        [HttpGet("createdby")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;
            int currentId = _authService.GetCurrentUserId();
            try
            {
                Paged<Organization> page = _service.GetByCreatedBy(pageIndex, pageSize, createdBy);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Organization>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        #endregion

        #region HttpGet("search by org name")
        [HttpGet("searchbyname")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetByName(int pageIndex, int pageSize, string name)
        {
            int code = 200;
            BaseResponse response = null;
            int currentId = _authService.GetCurrentUserId();
            try
            {
                Paged<Organization> page = _service.GetByName(pageIndex, pageSize, name);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Organization>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        #endregion

        #region HttpGet("search by org type name")
        [HttpGet("searchbytype")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetByOrgType(int pageIndex, int pageSize, string organizationTypeName)
        {
            int code = 200;
            BaseResponse response = null;
            int currentId = _authService.GetCurrentUserId();
            try
            {
                Paged<Organization> page = _service.GetByOrgType(pageIndex, pageSize, organizationTypeName);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Organization>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        #endregion

        #region HttpGet("search by is active")
        [HttpGet("isactive")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetByIsActive(int pageIndex, int pageSize, bool isActive)
        {
            int code = 200;
            BaseResponse response = null;
            int currentId = _authService.GetCurrentUserId();
            try
            {
                Paged<Organization> page = _service.GetByIsActive(pageIndex, pageSize, isActive);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Organization>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        #endregion

        #region Http Soft Delete
        [HttpDelete("active/{id:int}")]
        public ActionResult<SuccessResponse> Active(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Active(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        #endregion
      
    }
}
