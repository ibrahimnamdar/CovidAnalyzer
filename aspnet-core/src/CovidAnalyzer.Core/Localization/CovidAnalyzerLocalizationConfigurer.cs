using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace CovidAnalyzer.Localization
{
    public static class CovidAnalyzerLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(CovidAnalyzerConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(CovidAnalyzerLocalizationConfigurer).GetAssembly(),
                        "CovidAnalyzer.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
