'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, FileText, Home, Settings } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

export function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: 'Dashboard Overview',
      icon: Home,
      href: '/dashboard/dashboard-overview',
    },
    // {
    //   title: 'Assets',
    //   icon: Home,
    //   href: '/dashboard/assets',
    // },
    {
      title: 'Assets',
      icon: Settings,
      href: '/dashboard/assets',
      subItems: [
        {
          title: 'Assets',
          href: '/dashboard/assets/assets',
        },
        {
          title: 'Dispose',
          href: '/dashboard/assets/dispose',
        },
      ],
    },
    {
      title: 'Lists',
      icon: Settings,
      href: '/dashboard/lists',
      subItems: [
        {
          title: 'Lists of Assets',
          href: '/dashboard/lists/list-of-assets',
        },
        {
          title: 'Lists of Warrenties',
          href: '/dashboard/lists/list-of-warrenties',
        },
      ],
    },
    {
      title: 'Setup',
      icon: Settings,
      href: '/dashboard/setup',
      subItems: [
        {
          title: 'Company Info',
          href: '/dashboard/setup/company-info',
        },
        {
          title: 'Locations & Sites',
          href: '/dashboard/setup/locations-sites',
        },
        {
          title: 'Categories',
          href: '/dashboard/setup/categories',
        },
        {
          title: 'Departments',
          href: '/dashboard/setup/departments',
        },
        {
          title: 'Cost Centers',
          href: '/dashboard/setup/cost-centers',
        },
      ],
    },
  ]

  // Check if the current path is in the submenu items
  const isSubItemActive = (item: any) => {
    if (!item.subItems) return false
    return item.subItems.some((subItem: any) => pathname === subItem.href)
  }

  // Check if the current path matches the main item or its sub-items
  const isItemActive = (item: any) => {
    return pathname.startsWith(item.href) || isSubItemActive(item)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b mt-16">
        <div className="p-2">
          <h1 className="text-xl font-bold">My Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {!item.subItems ? (
                    // Regular menu item without submenu
                    <SidebarMenuButton
                      asChild
                      className={`${isItemActive(item) ? 'bg-yellow-400 text-black hover:bg-yellow-400' : ''}  `}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    // Menu item with submenu as accordion
                    <Collapsible
                      defaultOpen={isItemActive(item)}
                      className="w-full"
                    >
                      <CollapsibleTrigger className="w-full" asChild>
                        <SidebarMenuButton
                          className={`${isItemActive(item) ? 'bg-yellow-400 text-black hover:bg-yellow-400' : ''}  `}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={`${pathname === subItem.href ? 'bg-gray-100 text-black' : ''}`}
                              >
                                <Link href={subItem.href}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
