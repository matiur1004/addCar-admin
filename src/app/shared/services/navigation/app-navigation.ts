import { UserRoles } from "../../models/enums";
import { MenuItem, NavigationConfig, NavigationScreenSizeConfig } from "./navigation-config";
import { FranchiseeUserBigNavigationFactory } from "./sections/franchisee-user";

export class AppNavigation {
  public static LoadConfig(): NavigationConfig {
    let login_data = JSON.parse(localStorage.getItem('login_data'));
    if(login_data && login_data['roles'][0] == UserRoles.FranchiseeAdmin) {
      let menuItems = FranchiseeUserBigNavigationFactory.CreateMenu();
      return new NavigationConfig({
        screenSizeConfigs: [
          new NavigationScreenSizeConfig({
            // Default menu config for the big screens
            showTopMenu: true,
            menuItems: menuItems
          }),
        ]
      })
    } else {
      return new NavigationConfig({
        screenSizeConfigs: [
          new NavigationScreenSizeConfig({
            // Default menu config for the big screens
            showTopMenu: true,
            menuItems: [
              new MenuItem({
                title: "Content Management",
                route: "/content-management",
                roles: [],
                placement: "Top",
                breadcrumbTitle: 'Content Management',
                childItems: [
                  new MenuItem({
                    title: "Create $entityName$",
                    route: "/content-management/$entityLink$/new",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    activeExact: true,
                    icon: "fas fa-plus",
                    placement: "Side"
                  }),
                  new MenuItem({
                    title: "Pages",
                    route: "/content-management/pages/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-file-alt",
                    useParentMenu: true,
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "Widgets",
                    route: "/content-management/widgets/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-file-alt",
                    useParentMenu: true,
                    placement: "Side",
                    breadcrumbTitle: 'List',
                  }),
                  new MenuItem({
                    title: "Posts",
                    route: "/content-management/posts/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "far fa-comment-alt",
                    useParentMenu: true,
                    placement: "Side",
                  }),
                 /* new MenuItem({
                    title: "Media",
                    route: "/content-management/images/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "far fa-images",
                    useParentMenu: true,
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "Widgets",
                    route: "/content-management/widgets/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-indent",
                    useParentMenu: true,
                    placement: "Side",
                  }),*/
                  new MenuItem({
                    title: "Translations",
                    route: "/content-management/labels/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-language",
                    useParentMenu: true,
                    placement: "Side",
                  })
                ]
              }),
             /* new MenuItem({
                title: "Users",
                route: "/users",
                roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                placement: "Top",
              }),*/
              new MenuItem({
                title: "Franchisees",
                route: "/franchisees",
                roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                placement: "Top",
                breadcrumbTitle: 'Franchisees',
                childItems: [
                  new MenuItem({
                    title: "Franchisees",
                    route: "/franchisees/page",
                    icon: "fas fa-list-ul",
                    placement: "Side",
                    useParentMenu: true,
                    code: "franchisee-list",
                    breadcrumbTitle: 'List',
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/franchisees/page",
                        icon: "fas fa-backward",
                        code: "country-details",
                        useParentMenu: true,
                        disableBreadcrumb: true
                      }),
                      new MenuItem({
                        title: "Terms and conditions",
                        route: "/content-management/pages/country-page/:uid/terms-and-conditions",
                        icon: "fas fa-atlas",
                      }),
                      new MenuItem({
                        title: "Conditions",
                        route: "/content-management/pages/country-page/:uid/conditions",
                        icon: "fas fa-atlas",
                      }),
                      new MenuItem({
                        title: "Important information",
                        route: "/content-management/pages/country-page/:uid/important-information",
                        icon: "fas fa-info",
                      }),
                      new MenuItem({
                        title: "Content",
                        route: "/content-management/pages/country-page/:uid/content",
                        icon: "far fa-file-alt",
                      }),
                      new MenuItem({
                        title: "Country image",
                        route: "/franchisees/countries/:uid/image",
                        icon: "fas fa-images",
                        childItems: [
                          new MenuItem({
                            title: "Back to country",
                            route: "/franchisees/countries/:uid",
                            icon: "fas fa-backward",
                            code: "country-image",
                            useParentMenu: true,
                            disableBreadcrumb: true
                          }),
                        ]
                      }),
                    ]
                  }),
                  new MenuItem({
                    title: "Locations",
                    route: "/franchisees/locations/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-map-marked-alt",
                    placement: "Side",
                    useParentMenu: true,
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/franchisees/locations/page",
                        icon: "fas fa-backward",
                        code: "location-details",
                        useParentMenu: true,
                      }),
                      new MenuItem({
                        title: "Vehicles",
                        route: "/franchisees/locations/:uid/vehicles",
                        icon: "fas fa-car-side",
                        childItems: [
                          new MenuItem({
                            title: "Back to location",
                            route: "/franchisees/locations/:uid",
                            icon: "fas fa-backward",
                            code: "location-vehicles",
                            useParentMenu: true,
                          }),
                          new MenuItem({
                            title: "Return locations",
                            route: "/franchisees/locations/:uid/return-locations",
                            icon: "fas fa-caravan",
                          }),
                        ]
                      }),
                      new MenuItem({
                        title: "Return locations",
                        route: "/franchisees/locations/:uid/return-locations",
                        icon: "fas fa-caravan",
                        childItems: [
                          new MenuItem({
                            title: "Back to location",
                            route: "/franchisees/locations/:uid",
                            icon: "fas fa-backward",
                            code: "location-return-locations",
                            useParentMenu: true,
                          }),
                          new MenuItem({
                            title: "Vehicles",
                            route: "/franchisees/locations/:uid/vehicles",
                            icon: "fas fa-car-side",
                          }),
                        ]
                      }),
                    ]
                  }),
                ]
              }),
              new MenuItem({
                title: "Vehicles",
                route: "/vehicles",
                placement: "Top",
                childItems: [
                  new MenuItem({
                    title: "Create",
                    route: "/vehicles/new",
                    activeExact: true,
                    icon: "fas fa-plus",
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "List",
                    route: "/vehicles/page",
                    icon: "fas fa-list",
                    useParentMenu: true,
                    placement: "Side",
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/vehicles/page",
                        icon: "fas fa-backward",
                        code: "vehicle-details",
                        useParentMenu: true,
                      }),
                      new MenuItem({
                        title: "Pictures ($vehicleImageCount$)",
                        route: "/vehicles/:uid/images",
                        icon: "fas fa-images",
                        code: "vehicle-images",
                        hiddenFlagName: "isNewVehicle",
                        childItems: [
                          new MenuItem({
                            title: "Back to vehicle",
                            route: "/vehicles/:uid",
                            icon: "fas fa-backward",
                          }),
                        ]
                      })
                    ]
                  })
                ]
              }),
              new MenuItem({
                title: "Settings",
                route: "/settings",
                roles: [],
                placement: "Top",
              }),
            ]
          }),
          new NavigationScreenSizeConfig({
            maxResolution: 990, //Small and middle screens
            showTopMenu: true,
            menuItems: [
              new MenuItem({
                title: "Content Management",
                route: "/content-management",
                roles: [],
                placement: "Top",
                childItems: [
                  new MenuItem({
                    title: "Create",
                    route: "/content-management/pages/new",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    activeExact: true,
                    icon: "fas fa-plus",
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "List",
                    route: "/content-management/pages/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-list",
                    useParentMenu: true,
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "Posts",
                    route: "/content-management/posts/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "far fa-comment-alt",
                    useParentMenu: true,
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "Translations",
                    route: "/content-management/labels/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-language",
                    useParentMenu: true,
                    placement: "Side",
                  })
  
                ]
              }),
              /*new MenuItem({
                title: "Users",
                route: "/users",
                roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                placement: "Top",
              }), */
              new MenuItem({
                title: "Franchisees",
                route: "/franchisees",
                roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                placement: "Top",
                breadcrumbTitle: 'Franchisees',
                childItems: [
                  new MenuItem({
                    title: "Franchisees",
                    route: "/franchisees/page",
                    icon: "fas fa-list-ul",
                    placement: "Side",
                    useParentMenu: true,
                    code: "franchisee-list",
                    breadcrumbTitle: 'List',
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/franchisees/page",
                        icon: "fas fa-backward",
                        code: "franchisee-details",
                        useParentMenu: true,
                      })
                    ]
                  }),
                  new MenuItem({
                    title: "Locations",
                    route: "/franchisees/locations/page",
                    roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
                    icon: "fas fa-map-marked-alt",
                    placement: "Side",
                    useParentMenu: true,
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/franchisees/locations/page",
                        icon: "fas fa-backward",
                        code: "location-details",
                        useParentMenu: true,
                      }),
                      new MenuItem({
                        title: "Vehicles",
                        route: "/franchisees/locations/:uid/vehicles",
                        icon: "fas fa-car-side",
                        childItems: [
                          new MenuItem({
                            title: "Back to location",
                            route: "/franchisees/locations/:uid",
                            icon: "fas fa-backward",
                            code: "location-vehicles",
                            useParentMenu: true,
                          }),
                          new MenuItem({
                            title: "Return locations",
                            route: "/franchisees/locations/:uid/return-locations",
                            icon: "fas fa-caravan",
                          }),
                        ]
                      }),
                      new MenuItem({
                        title: "Return locations",
                        route: "/franchisees/locations/:uid/return-locations",
                        icon: "fas fa-caravan",
                        childItems: [
                          new MenuItem({
                            title: "Back to location",
                            route: "/franchisees/locations/:uid",
                            icon: "fas fa-backward",
                            code: "location-return-locations",
                            useParentMenu: true,
                          }),
                          new MenuItem({
                            title: "Vehicles",
                            route: "/franchisees/locations/:uid/vehicles",
                            icon: "fas fa-car-side",
                          }),
                        ]
                      }),
                    ]
                  }),
                ]
              }),
              new MenuItem({
                title: "Vehicles",
                route: "/vehicles",
                placement: "Top",
                childItems: [
                  new MenuItem({
                    title: "Create",
                    route: "/vehicles/new",
                    activeExact: true,
                    icon: "fas fa-plus",
                    placement: "Side",
                  }),
                  new MenuItem({
                    title: "List",
                    route: "/vehicles/page",
                    icon: "fas fa-list",
                    useParentMenu: true,
                    placement: "Side",
                    childItems: [
                      new MenuItem({
                        title: "Back to list",
                        route: "/vehicles/page",
                        icon: "fas fa-backward",
                        code: "vehicle-details",
                        useParentMenu: true,
                      }),
                      new MenuItem({
                        title: "Pictures ($vehicleImageCount$)",
                        route: "/vehicles/:uid/images",
                        icon: "fas fa-images",
                        code: "vehicle-images",
                        hiddenFlagName: "isNewVehicle",
                        childItems: [
                          new MenuItem({
                            title: "Back to vehicle",
                            route: "/vehicles/:uid",
                            icon: "fas fa-backward",
                          }),
                        ]
                      })
                    ]
                  })
                ]
              }),
              new MenuItem({
                title: "Settings",
                route: "/settings",
                roles: [],
                placement: "Top",
              }),
  
            ]
          })
        ]
      });
    }
    
  }
}
