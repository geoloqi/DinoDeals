/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"9C9GZozifhCyNOy4LFDz1zs8bFkPLRdT"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"MdSaTggMXe2WPmGA7YS4zbRaeX51N5Td"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"tbedzBnWdgRVBt6r2izw1hx8HO5wXH3x"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"5n1gIa6gbM7owwVMG5FkE4DUWF2dlw7Z"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"EItYlcuavE7VfXKMIXdG3NkvBTInPI4W"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"TfHa9Zzt11uNX7HS6g9sEBcnW64MniXQ"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
