using Abp.Authorization;
using CovidAnalyzer.Authorization.Roles;
using CovidAnalyzer.Authorization.Users;

namespace CovidAnalyzer.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
