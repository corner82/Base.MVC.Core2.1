using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Base.Core.Exceptions.Custom;
using Base.Core.Entities.Session;
using Base.MVC.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
//using Wangkanai.Detection;
using Base.Core.Entities.Identity;
using Base.Core.Extensions.Session;
using Base.Filters.Log.RabbitMQ;
using System.Text.RegularExpressions;

namespace Base.MVC.Controllers
{
    public class AccController : Controller
    {
        private readonly UserManager<CustomIdentityUser> _userManager;
        private readonly SignInManager<CustomIdentityUser> _signinManager;
        private readonly RoleManager<CustomIdentityRole> _roleManager;

        private readonly IDistributedCache _distributedCache;
        //private readonly IDeviceResolver _deviceResolver;


        public AccController(UserManager<CustomIdentityUser> userManager,
                                SignInManager<CustomIdentityUser> signinManager,
                                RoleManager<CustomIdentityRole> roleManager,

                                IDistributedCache distributedCache
                                /*IDeviceResolver deviceResolver*/)
        {
            _userManager = userManager;
            _signinManager = signinManager;
            _distributedCache = distributedCache;
            //_deviceResolver = deviceResolver;
            _roleManager = roleManager;

        }

        [HttpGet]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public IActionResult Login()
        {
            return View();
        }
        [HttpGet]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public IActionResult Register()
        {
            return View();
        }

        //[Route("Acc/[controller]")]
        [HttpGet("Acc/DeleteRole/{roleStr}")]
        public async Task<string> DeleteRole(string roleStr)
        {
            if(_roleManager.RoleExistsAsync(roleStr).Result)
            {
                var role = _roleManager.Roles.Where(p => p.Name == roleStr).FirstOrDefault();
                IdentityResult roleResult = await _roleManager.DeleteAsync(role);
                if (roleResult.Succeeded) return "role delete succeeded";
                return "role delete not succeeded";
            }
            return "role not found";
        }

        [HttpGet("Acc/CheckCreateRole/{roleStr}")]
        //[HttpGet]
        public async Task<string> CheckCreateRole(string roleStr)
        {

            var t = roleStr.Trim().ToUpper();
            t = Regex.Replace(t, @"\s", "");
            //t.Replace(" ", String.Empty);
            //t.Replace("_", String.Empty);
            //return t;
            // Back Office Order Management
            var roleQueryRes = _roleManager.Roles.Where(p => p.NormalizedName == t).FirstOrDefault();
            if (roleQueryRes == null)
            //if (!_roleManager.RoleExistsAsync(t).Result)
            {
                CustomIdentityRole role = new CustomIdentityRole
                {
                    Name = roleStr,
                    NormalizedName = t
                };

                IdentityResult roleResult = _roleManager.CreateAsync(role).Result;

                if (!roleResult.Succeeded)
                {
                    ModelState.AddModelError("", "We can't add the role");
                    return "we cannot add the role";
                }
                else if (roleResult.Succeeded)
                {
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.edit"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.delete"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.list"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.invoice"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.documantcontrol"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.list"));
                }
                //return View();
                return "Role creation success";
            } else
            {
                return "Role already created";
            }

            
        }

        //[HttpGet("Acc/CreateRole/{roleStr}")]
        [HttpGet]
        public async Task<string> CreateRole(string roleStr)
        {
            
            if (!_roleManager.RoleExistsAsync("Back Office Order Management").Result)
            {
                CustomIdentityRole role = new CustomIdentityRole
                {
                    Name = "Back Office Order Management",
                    
                };

                IdentityResult roleResult = _roleManager.CreateAsync(role).Result;

                if (!roleResult.Succeeded)
                {
                    ModelState.AddModelError("", "We can't add the role");
                    return "we cannot add the role";
                }
                else if (roleResult.Succeeded)
                {
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.edit"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.delete"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.list"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.invoice"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.documantcontrol"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "deal.list"));
                }
                //return View();
            }

            if (!_roleManager.RoleExistsAsync("Salesman").Result)
            {
                CustomIdentityRole role = new CustomIdentityRole
                {
                    Name = "Salesman"
                };

                IdentityResult roleResult = _roleManager.CreateAsync(role).Result;

                if (!roleResult.Succeeded)
                {
                    ModelState.AddModelError("", "We can't add the role");
                    return  "we cannot add the role"; 
                } else
                {
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "owndeal.create"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "owndeal.update"));
                    await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "owndeal.list"));
                }

               
            }


            return "Role creation success";
        }

        [HttpPost]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                CustomIdentityUser user = new CustomIdentityUser
                {
                    UserName = registerViewModel.Email,
                    Email = registerViewModel.Email,
                };

                IdentityResult result = _userManager.CreateAsync(user, registerViewModel.Password).Result;

                if (result.Succeeded)
                {
                    if (!_roleManager.RoleExistsAsync("Manager").Result)
                    {
                        CustomIdentityRole role = new CustomIdentityRole
                        {
                            Name = "Manager"
                        };

                        IdentityResult roleResult = _roleManager.CreateAsync(role).Result;

                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "projects.delete"));
                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "projects.create"));
                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "projects.update"));

                        if (!roleResult.Succeeded)
                        {
                            ModelState.AddModelError("", "We can't add the role");
                            return View(registerViewModel);
                        };
                        //return View(registerViewModel);
                    }

                    if (!_roleManager.RoleExistsAsync("Admin").Result)
                    {
                        CustomIdentityRole role = new CustomIdentityRole
                        {
                            Name = "Admin"
                        };

                        IdentityResult roleResult = _roleManager.CreateAsync(role).Result;

                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "allprojects.delete"));
                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "allprojects.create"));
                        await _roleManager.AddClaimAsync(role, new Claim(ClaimsIdentity.DefaultRoleClaimType, "allprojects.update"));

                        if (!roleResult.Succeeded)
                        {
                            ModelState.AddModelError("", "We can't add the role");
                            return View(registerViewModel);
                        };
                        //return View(registerViewModel);
                    }

                    // await roleManager.AddClaimAsync(adminRole, new Claim(CustomClaimTypes.Permission, "projects.view"));
                    await _userManager.AddClaimAsync(user, new Claim("claimtip", user.Email));
                    _userManager.AddToRoleAsync(user, "Admin").Wait();
                    _userManager.AddToRoleAsync(user, "Manager").Wait();
                    return RedirectToAction("Login", "Acc");
                }
            }
            return View(registerViewModel);
        }

        [HttpPost]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            Microsoft.AspNetCore.Identity.SignInResult result = new Microsoft.AspNetCore.Identity.SignInResult();
            try {
                result = _signinManager.PasswordSignInAsync(model.Email,
                                                        model.Password, false, false).Result;
            } catch(Exception ex) {
                throw new IdentityManagerException(Convert.ToInt32(HttpStatusCode.BadGateway), ex);
            }

            List<string> roleList;
            if (result.Succeeded)
            {
               
                try
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    var roles = _userManager.GetRolesAsync(user);

                    var claims = _userManager.GetClaimsAsync(user);
                    List<Claim> claimList = claims.Result.ToList();
                    List<SessionUserClaimModel> sessionUserClaimList = new List<SessionUserClaimModel>();
                    foreach(var claim in claimList)
                    {
                        sessionUserClaimList.Add(new SessionUserClaimModel()
                        {
                            ClaimType = claim.Type,
                            ClaimValue  = claim.Value
                        });
                    }

                    roleList = roles.Result.ToList();

                    var sessionUser = new SessionUserModel()
                    {
                        Email = user.Email,
                        ConcurrencyStamp = user.ConcurrencyStamp,
                        Id = user.Id,
                        PhoneNumber = user.PhoneNumber,
                        SecurityStamp = user.SecurityStamp,
                        UserName = user.UserName,
                        Roles = roleList,
                        UserClaims = sessionUserClaimList,
                        Password = user.PasswordHash,
                        //UserAgent = Convert.ToBase64String(Encoding.UTF8.GetBytes( _deviceResolver.UserAgent.ToString()))
                        //UserAgent = _deviceResolver.UserAgent.ToString()
                        UserAgent = "",
                        //RootID = user.RootId
                    };
                    HttpContext.Session.Set("CurrentUser", sessionUser);
                    var ff = JsonConvert.SerializeObject(user);
                    await _distributedCache.SetStringAsync(user.ConcurrencyStamp, JsonConvert.SerializeObject(sessionUser));
                    await _distributedCache.SetStringAsync("TestKey", "Test Key value");
                    var userTest = JsonConvert.DeserializeObject<SessionUserModel>(await _distributedCache.GetStringAsync(user.ConcurrencyStamp));

                }
                catch(Exception ex)
                {
                    //throw new Exception("unhandled exception", ex);
                    //throw new HttpStatusCodeException(404, ex);
                    throw new RedisManagerException(ex);

                }
                //return Redirect("http://localhost:51769/Adm/Dsh");

                if (roleList[0] == "Admin")
                {
                    return Redirect("~/Adm/Dsh");
                }
                else if (roleList[0] == "Salesman")
                {
                    return Redirect("~/Dashboard/Salesman");
                }
                else if (roleList[0] == "head of retail")
                {
                    return Redirect("~/Dashboard/Retailchannelhead");
                }
                else if (roleList[0] == "head of pcd")
                {
                    return Redirect("~/Dashboard/Pcdmanager");
                }
                else if (roleList[0] == "head of product management")
                {
                    return Redirect("~/Dashboard/Backoffice");
                }
                else if (roleList[0] == "body builder specialist")
                {
                    return Redirect("~/Dashboard/Backoffice");
                } else if (roleList[0] == "sales admin manager")
                {
                    return Redirect("~/Dashboard/Keyaccountchannelhead");
                }
                else if (roleList[0] == "costing manager")
                {
                    return Redirect("~/Dashboard/Backoffice");
                }
                else if (roleList[0] == "head of order management")
                {
                    return Redirect("~/Dashboard/Backoffice");
                }
                else if (roleList[0] == "fd")
                {
                    return Redirect("~/Dashboard/Headofsales");
                }
                else if (roleList[0] == "md")
                {
                    return Redirect("~/Dashboard/Headofsales");
                }
                else if (roleList[0] == "master users")
                {
                    return Redirect("~/Dashboard/Backoffice");
                }
                else if (roleList[0] == "hos")
                {
                    return Redirect("~/Dashboard/Headofsales"); 
                }


                //return RedirectToAction("Dsh", "Adm");
                //return RedirectToAction(WebUtility.UrlEncode(returnUrl));
            } else
            {
                ModelState.AddModelError("hata", "status not verified");
            } 

            return View(model);
            
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signinManager.SignOutAsync();
            //return RedirectToAction(nameof(HomeController.Index), "Home");
            return RedirectToAction("Login");
            //return RedirectToAction("Index");

        }

        [HttpGet]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public IActionResult RegisterUser()
        {
            return View();
        }

        [HttpPost]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> RegisterUser(RegisterWithRoleViewModel registerWithRoleViewModel)
        {
            if (ModelState.IsValid)
            {
                CustomIdentityUser user = new CustomIdentityUser
                {
                    UserName = registerWithRoleViewModel.Email,
                    Email = registerWithRoleViewModel.Email,
                };

                IdentityResult result = _userManager.CreateAsync(user, registerWithRoleViewModel.Password).Result;

                if (result.Succeeded)
                {
                    
                    // await roleManager.AddClaimAsync(adminRole, new Claim(CustomClaimTypes.Permission, "projects.view"));
                    //await _userManager.AddClaimAsync(user, new Claim("claimtip", user.Email)); 
                    CustomIdentityRole  role = await _roleManager.FindByNameAsync(registerWithRoleViewModel.Role.Trim());
                    if (role == null)
                    {
                        await _userManager.DeleteAsync(user);
                        ModelState.AddModelError("Error", "role not verified");
                    } else
                    {
                        _userManager.AddToRoleAsync(user, registerWithRoleViewModel.Role.Trim()).Wait();
                    }
                    // _userManager.AddToRoleAsync(user, "Manager").Wait();
                    //return RedirectToAction("Login", "Acc");

                } else
                {
                    List<IdentityError> errors = result.Errors.ToList<IdentityError>();
                    foreach(var error in errors)
                    {
                        ModelState.AddModelError("Error", error.Description);
                    }
                }
            }
            return View(registerWithRoleViewModel);
        }

        [HttpGet]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public IActionResult  DeleteUser()
        {
            return   View();
        }

        [HttpPost]
        [ServiceFilter(typeof(PageEntryLogRabbitMQAttribute))]
        public async Task<IActionResult> DeleteUser(DeletUserViewModel deleteUserViewModel)
        {
            if(ModelState.IsValid)
            {
                CustomIdentityUser user = await _userManager.FindByEmailAsync(deleteUserViewModel.Email.Trim());
                if(user == null)
                {
                    ModelState.TryAddModelError("Error", "User not found");
                } else
                {
                    await _userManager.DeleteAsync(user);
                }
            } else
            {
                ModelState.AddModelError("Model state not valid", "Model state not valid");
            }
            return View(deleteUserViewModel);
        }
    }
}