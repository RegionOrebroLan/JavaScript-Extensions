using Microsoft.AspNetCore.Builder;

namespace Application
{
	public class Startup
	{
		#region Methods

		public void Configure(IApplicationBuilder applicationBuilder)
		{
			applicationBuilder.UseDefaultFiles();
			applicationBuilder.UseStaticFiles();
		}

		#endregion
	}
}