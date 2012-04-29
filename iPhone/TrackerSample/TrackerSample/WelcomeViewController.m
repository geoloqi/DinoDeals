//
//  WelcomeViewController.m
//  EverydayCity
//
//  Created by Aaron Parecki on 2012-04-14.
//  Copyright (c) 2012 Geoloqi. All rights reserved.
//

#import "WelcomeViewController.h"
#import "DemoAppDelegate.h"

@interface WelcomeViewController ()

@end

@implementation WelcomeViewController

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
    // Do any additional setup after loading the view from its nib.
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

- (IBAction)signinWasTapped:(id)sender {
    NSMutableArray *scopes = [NSMutableArray arrayWithCapacity:1];
    [scopes insertObject:@"publish_actions" atIndex:0];
    [appDelegate.facebook authorize:scopes];
}

@end
