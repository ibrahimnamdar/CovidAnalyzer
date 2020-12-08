using System.ComponentModel.DataAnnotations;

namespace CovidAnalyzer.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}