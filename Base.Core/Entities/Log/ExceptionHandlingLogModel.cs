
namespace Base.Core.Entities.Log
{
    public class ExceptionHandlingLogModel
    {
        public string Host { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string SessionID { get; set; }
        public string UserName { get; set; }
    }
}
