//
//  EverydayCityViewController.m
//  EverydayCity
//
//  Copyright (c) 2012 Geoloqi, Inc. All rights reserved.
//

#import "SettingsViewController.h"
#import "DemoAppDelegate.h"

@implementation SettingsViewController
@synthesize currentTrackingProfile;
@synthesize currentLocationField, currentLocationActivityIndicator;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    loadingView.hidden = NO;
	// Do any additional setup after loading the view, typically from a nib.

    NSURL *url = [NSURL URLWithString:@"https://dinodeals.geoloqi.com/api/categories"];
	NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url 
                                                                cachePolicy:NSURLRequestReloadIgnoringCacheData 
                                                            timeoutInterval:10.0];
    
	[request setHTTPMethod:@"GET"];
    [request setValue:[NSString stringWithFormat:@"Bearer %@", [LQSession savedSession].accessToken] forHTTPHeaderField:@"Authorization"];
    [[LQSession savedSession] runAPIRequest:request completion:^(NSHTTPURLResponse *response, NSDictionary *responseDictionary, NSError *error) {
        // On response, store the Geoloqi token and start tracking in passive mode
        NSLog(@"Response! %@", responseDictionary);
        if([responseDictionary objectForKey:@"categories"]) {
            categories = [responseDictionary objectForKey:@"categories"];
            [tableView reloadData];
            loadingView.hidden = YES;
        } else {
            // Error logging in
        }
    }];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    // self.currentTrackingProfile.selectedSegmentIndex = [self segmentIndexForTrackingProfile:[[LQTracker sharedTracker] profile]];    
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

#pragma mark -

- (IBAction)fbLogoutWasTapped:(UIButton *)sender 
{
    [[appDelegate facebook] logout];
}

- (int)segmentIndexForTrackingProfile:(LQTrackerProfile)profile
{
    switch(profile) {
        case LQTrackerProfileOff:      return 0;
        case LQTrackerProfilePassive:  return 1;
        case LQTrackerProfileRealtime: return 2;
        case LQTrackerProfileLogging:  return 3;
    }
}

- (LQTrackerProfile)profileForSegmentIndex:(int)index
{
    switch(index) {
        case 0: return LQTrackerProfileOff;
        case 1: return LQTrackerProfilePassive;
        case 2: return LQTrackerProfileRealtime;
        case 3: return LQTrackerProfileLogging;
        default: return LQTrackerProfileOff;
    }
}

- (IBAction)trackingProfileWasTapped:(UISegmentedControl *)sender
{
    NSLog(@"Tapped %d", sender.selectedSegmentIndex);
    [[LQTracker sharedTracker] setProfile:[self profileForSegmentIndex:sender.selectedSegmentIndex]];
}

#pragma mark - UITableViewDelegate

- (NSMutableDictionary *)getCategoryAtIndex:(int)index {
    NSMutableDictionary *layer = nil;
    layer = [[categories objectAtIndex:index] mutableCopy];
    return layer;
}

- (NSMutableDictionary *)getCategoryAtIndexPath:(NSIndexPath *)indexPath {
    return [self getCategoryAtIndex:indexPath.row];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if(categories) {
        return [categories count];
    } else {
        return 0;
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 50.0;
}

- (UITableViewCell *)tableView:(UITableView *)_tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	static NSString *myIdentifier = @"MyIdentifier";
	myIdentifier = @"tblCellView";
	
	CategoryCell *cell = (CategoryCell *)[_tableView dequeueReusableCellWithIdentifier:myIdentifier];
    
	if(cell == nil) {
		[[NSBundle mainBundle] loadNibNamed:@"CategoryCell" owner:self options:nil];
		cell = categoryCell;
	}
    
	NSDictionary *category = [self getCategoryAtIndexPath:indexPath];
	
	[cell setLabelText:[category objectForKey:@"name"]];
    [cell setSubscribedSwitch:[category objectForKey:@"subscribed"]];
    [cell setSwitchTag:indexPath.row];
    
	return cell;
}

#pragma mark -

- (IBAction)categorySwitchWasTapped:(UISwitch *)sender {
	NSDictionary *category = [self getCategoryAtIndex:sender.tag];
    NSString *path;
    if(sender.on) {
        path = [NSString stringWithFormat:@"/layer/subscribe/%@", [category objectForKey:@"id"]];
    } else {
        path = [NSString stringWithFormat:@"/layer/unsubscribe/%@", [category objectForKey:@"id"]];
    }
    
    NSMutableURLRequest *request = [[LQSession savedSession] requestWithMethod:@"POST" path:path payload:nil];
    [[LQSession savedSession] runAPIRequest:request
                                 completion:^(NSHTTPURLResponse *response, NSDictionary *responseDictionary, NSError *error) {
//                                     NSLog(@"Response: %@", response);
                                 }];
//    NSLog(@"%@", category);
}


@end
