export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  adminOnly?: boolean;
}