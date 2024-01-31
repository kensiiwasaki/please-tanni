import "@typespec/http";
 
using TypeSpec.Http;
 
@service({
  title: "User API",
  version: "1.0.0",
})
@server("https://example.com/api", "production")
namespace UserAPI;

model User {
  id: string;
  name: string;
}