using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.EmailServices
{
	public class IMailService
	{
		Task SendEmailAsync(MailRequest mailRequest);
	}
}
