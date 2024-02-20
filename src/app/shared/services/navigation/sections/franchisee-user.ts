import { MenuItem } from "../navigation-config";
import { UserRoles } from "../../../models/enums";

export class FranchiseeUserBigNavigationFactory {  
  public static CreateMenu(): MenuItem[] {
    
      return [
        new MenuItem({
          title: "Content Management",
          route: "/content-management",
          roles: [],
          placement: "Top",
          breadcrumbTitle: 'Content Management',
          childItems: [
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
            })
          ]
        }),
      ]
    
  }
}