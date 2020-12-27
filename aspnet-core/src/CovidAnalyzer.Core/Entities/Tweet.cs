using System;
using System.Collections.Generic;
using System.Globalization;
using Abp.Domain.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CovidAnalyzer.Entities
{

    public partial class Tweet : Entity
    {
        [JsonProperty("attachments")]
        public object Attachments { get; set; }

        [JsonProperty("author_id")]
        public string AuthorId { get; set; }

        [JsonProperty("context_annotations")]
        public List<ContextAnnotation> ContextAnnotations { get; set; }

        [JsonProperty("conversation_id")]
        public string ConversationId { get; set; }

        [JsonProperty("created_at")]
        public DateTimeOffset CreatedAt { get; set; }

        [JsonProperty("entities")]
        public Entities Entities { get; set; }

        [JsonProperty("geo")]
        public object Geo { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("in_reply_to_user_id")]
        public object InReplyToUserId { get; set; }

        [JsonProperty("lang")]
        public Lang Lang { get; set; }

        [JsonProperty("possibly_sensitive")]
        public bool PossiblySensitive { get; set; }

        [JsonProperty("referenced_tweets")]
        public List<ReferencedTweet> ReferencedTweets { get; set; }

        [JsonProperty("source")]
        public Source Source { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("withheld")]
        public object Withheld { get; set; }

        [JsonProperty("non_public_metrics")]
        public object NonPublicMetrics { get; set; }

        [JsonProperty("organic_metrics")]
        public object OrganicMetrics { get; set; }

        [JsonProperty("promoted_metrics")]
        public object PromotedMetrics { get; set; }

        [JsonProperty("public_metrics")]
        public PublicMetrics PublicMetrics { get; set; }
    }

    public partial class ContextAnnotation
    {
        [JsonProperty("domain")]
        public Domain Domain { get; set; }

        [JsonProperty("entity")]
        public Domain Entity { get; set; }
    }

    public partial class Domain
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public partial class Entities
    {
        [JsonProperty("annotations")]
        public List<Annotation> Annotations { get; set; }

        [JsonProperty("cashtags")]
        public object Cashtags { get; set; }

        [JsonProperty("hashtags")]
        public object Hashtags { get; set; }

        [JsonProperty("mentions")]
        public List<Mention> Mentions { get; set; }

        [JsonProperty("urls")]
        public object Urls { get; set; }
    }

    public partial class Annotation
    {
        [JsonProperty("end")]
        public long End { get; set; }

        [JsonProperty("normalized_text")]
        public string NormalizedText { get; set; }

        [JsonProperty("probability")]
        public double Probability { get; set; }

        [JsonProperty("start")]
        public long Start { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }
    }

    public partial class Mention
    {
        [JsonProperty("end")]
        public long End { get; set; }

        [JsonProperty("start")]
        public long Start { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }
    }

    public partial class PublicMetrics
    {
        [JsonProperty("like_count")]
        public long LikeCount { get; set; }

        [JsonProperty("quote_count")]
        public long QuoteCount { get; set; }

        [JsonProperty("reply_count")]
        public long ReplyCount { get; set; }

        [JsonProperty("retweet_count")]
        public long RetweetCount { get; set; }
    }

    public partial class ReferencedTweet
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("type")]
        public TypeEnum Type { get; set; }
    }

    public enum Lang { En, Pt, Uk };

    public enum TypeEnum { Retweeted };

    public enum Source { TwitterForAndroid, TwitterForIPhone, TwitterWebApp };

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                LangConverter.Singleton,
                TypeEnumConverter.Singleton,
                SourceConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class LangConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Lang) || t == typeof(Lang?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "en":
                    return Lang.En;
                case "pt":
                    return Lang.Pt;
                case "uk":
                    return Lang.Uk;
            }
            throw new Exception("Cannot unmarshal type Lang");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Lang)untypedValue;
            switch (value)
            {
                case Lang.En:
                    serializer.Serialize(writer, "en");
                    return;
                case Lang.Pt:
                    serializer.Serialize(writer, "pt");
                    return;
                case Lang.Uk:
                    serializer.Serialize(writer, "uk");
                    return;
            }
            throw new Exception("Cannot marshal type Lang");
        }

        public static readonly LangConverter Singleton = new LangConverter();
    }

    internal class TypeEnumConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(TypeEnum) || t == typeof(TypeEnum?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "retweeted")
            {
                return TypeEnum.Retweeted;
            }
            throw new Exception("Cannot unmarshal type TypeEnum");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (TypeEnum)untypedValue;
            if (value == TypeEnum.Retweeted)
            {
                serializer.Serialize(writer, "retweeted");
                return;
            }
            throw new Exception("Cannot marshal type TypeEnum");
        }

        public static readonly TypeEnumConverter Singleton = new TypeEnumConverter();
    }

    internal class SourceConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Source) || t == typeof(Source?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Twitter Web App":
                    return Source.TwitterWebApp;
                case "Twitter for Android":
                    return Source.TwitterForAndroid;
                case "Twitter for iPhone":
                    return Source.TwitterForIPhone;
            }

            throw new Exception("Cannot unmarshal type Source");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }

            var value = (Source) untypedValue;
            switch (value)
            {
                case Source.TwitterWebApp:
                    serializer.Serialize(writer, "Twitter Web App");
                    return;
                case Source.TwitterForAndroid:
                    serializer.Serialize(writer, "Twitter for Android");
                    return;
                case Source.TwitterForIPhone:
                    serializer.Serialize(writer, "Twitter for iPhone");
                    return;
            }

            throw new Exception("Cannot marshal type Source");
        }

        public static readonly SourceConverter Singleton = new SourceConverter();
    }
}
