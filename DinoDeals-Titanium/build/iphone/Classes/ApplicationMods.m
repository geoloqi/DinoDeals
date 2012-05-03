#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.0.1",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"geoloqimodule",@"name",@"ti.geoloqi",@"moduleid",@"1.0",@"version",@"0cdcfb92-af6a-4d12-b518-792bb64f1b6f",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
