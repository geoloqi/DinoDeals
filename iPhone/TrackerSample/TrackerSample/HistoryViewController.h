//
//  HistoryViewController.h
//  EverydayCity
//
//  Created by Aaron Parecki on 2012-04-24.
//  Copyright (c) 2012 Geoloqi. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HistoryViewController : UIViewController

@property IBOutlet UIWebView *webView;

- (IBAction)reloadWasTapped:(UIButton *)sender;


@end
