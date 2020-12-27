using System.Collections.Generic;
using Abp.Configuration;

namespace CovidAnalyzer.Configuration
{
    public class AppSettingProvider : SettingProvider
    {
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new[]
            {
                new SettingDefinition(AppSettingNames.UiTheme, "red", scopes: SettingScopes.Application | SettingScopes.Tenant | SettingScopes.User, isVisibleToClients: true),
                new SettingDefinition(AppSettingNames.TwitterAccessToken, "407914442-ERN0k8q2s732tnK3Of4HfChWWZ0oh7mHwHDZSq66"),
                new SettingDefinition(AppSettingNames.TwitterAccessTokenSecret, "v9lsjMb7IlfeWKTYLZVjEUpJTwKlLp0CQw1xUfr6FX1Z0"),
                new SettingDefinition(AppSettingNames.TwitterConsumerKey, "Sbtil3a6bHCQXYY7xAeCZE2Eh"),
                new SettingDefinition(AppSettingNames.TwitterConsumerSecret, "9R6N1hVDFp5ZxuDwcCd6HRWPzVWX4I7WkSMWi9eEfsYLZCyQ0Z")
            };
        }
    }
}
