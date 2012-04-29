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

@synthesize webView;

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
    NSURL *url = [NSURL URLWithString:@"https://deals.geoloqi.com/history"];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url 
                                                                cachePolicy:NSURLRequestReloadIgnoringCacheData 
                                                            timeoutInterval:10.0];
    [request setValue:[NSString stringWithFormat:@"Bearer %@", [LQSession savedSession].accessToken] forHTTPHeaderField:@"Authorization"];
    [self.webView loadRequest:request];
    
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

- (IBAction)reloadWasTapped:(UIButton *)sender {
    [self.webView reload];
}

@end
