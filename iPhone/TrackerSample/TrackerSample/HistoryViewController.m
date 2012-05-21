//
//  HistoryViewController.m
//  EverydayCity
//
//  Created by Aaron Parecki on 2012-04-24.
//  Copyright (c) 2012 Geoloqi. All rights reserved.
//

#import "HistoryViewController.h"
#import "DemoAppDelegate.h"

@interface HistoryViewController ()

@end

@implementation HistoryViewController

@synthesize webView, currentCity;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    webView.scrollView.bounces = NO;
    
    // Do any additional setup after loading the view from its nib.

    
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"activity" 
                                                                                                             ofType:@"html"]
                                                                 isDirectory:NO]]];
    
//    NSString *path = [[NSBundle mainBundle] bundlePath];
//    NSURL *baseURL = [NSURL fileURLWithPath:path];
//    
//    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"activity" ofType:@"html" inDirectory:nil];
//    NSString *htmlString = [NSString stringWithContentsOfFile:htmlFile encoding:NSUTF8StringEncoding error:nil];
//    [self.webView loadHTMLString:htmlString baseURL:baseURL];

    
//    NSURL *url = [NSURL URLWithString:@"https://deals.geoloqi.com/history"];
//    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url 
//                                                                cachePolicy:NSURLRequestReloadIgnoringCacheData 
//                                                            timeoutInterval:10.0];
//    [request setValue:[NSString stringWithFormat:@"Bearer %@", [LQSession savedSession].accessToken] forHTTPHeaderField:@"Authorization"];
//    [self.webView loadRequest:request];
    
    // [self reloadCurrentLocation];
    
    [[LQTracker sharedTracker] setProfile:LQTrackerProfilePassive];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

# pragma mark -

-(BOOL) webView:(UIWebView *)inWeb shouldStartLoadWithRequest:(NSURLRequest *)inRequest navigationType:(UIWebViewNavigationType)inType {
    NSLog(@"Request: %@", inRequest);
    NSLog(@"Scheme: %@", inRequest.URL.scheme);
    
    if([inRequest.URL.scheme isEqualToString:@"dinodeals"]) {
        [appDelegate.tabBarController setSelectedIndex:1];
        return NO;
    }
    
    if ( inType == UIWebViewNavigationTypeLinkClicked ) {
        [[UIApplication sharedApplication] openURL:[inRequest URL]];
        return NO;
    }
    
    return YES;
}

- (IBAction)reloadWasTapped:(UIButton *)sender {
    [self.webView reload];
    // [self reloadCurrentLocation];
}

- (void)reloadCurrentLocation {
    NSURLRequest *request = [[LQSession savedSession] requestWithMethod:@"GET" path:@"/location/context" payload:nil];
    [[LQSession savedSession] runAPIRequest:request completion:^(NSHTTPURLResponse *response, NSDictionary *responseDictionary, NSError *error) {
        self.currentCity.text = [responseDictionary objectForKey:@"best_name"];
    }];
}

@end
