import {IRoute} from './navigation.types.ts';
import HomePage from '@/components/pages/home/Home.tsx';
import FavoritePage from '@/components/pages/favorite/Favorite.tsx';
import ProfilePage from '@/components/pages/profile/Profile.tsx';
import SignIn from '@/components/pages/sign-in/SignIn.tsx';
import SignUp from '@/components/pages/sign-up/SignUp.tsx';
import ProductInfoPage from '@/components/pages/product-info/ProductInfo.tsx';
import SalePage from '@/components/pages/sale/Sale.tsx';
import OrderHistoryPage from '@/components/pages/order-history/OrderHistory.tsx';
import OrderHistoryInfoPage from '@/components/pages/order-history-info/OrderHistoryInfo.tsx';
import CreateOrderPage from '@/components/pages/create-order/CreateOrder.tsx';
import AddProductPage from '@/components/pages/add-product/AddProduct.tsx';
import EditProductPage from '@/components/pages/edit-product/EditProduct.tsx';
import SellerProductsPage from '@/components/pages/seller-products/SellerProducts.tsx';
import StyleSelectionPage from '@/components/pages/style-selection/StyleSelection.tsx';
import ForgotPasswordPage from '@/components/pages/forgot-password/ForgotPassword.tsx';
import NewPasswordPage from '@/components/pages/new-password/NewPassword.tsx';
import ForgotPasswordCode from '@/components/pages/forgot-password-code/ForgotPasswordCode.tsx';
import SupportPage from '@/components/pages/support/Support.tsx';
import SaleStatsPage from '@/components/pages/sale-stats/SaleStats.tsx';

export const routes: IRoute[] = [
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'HomePage',
    component: HomePage,
  },
  {
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    name: 'FavoritePage',
    component: FavoritePage,
  },
  {
    name: 'SupportPage',
    component: SupportPage,
  },
  {
    name: 'ProductInfo',
    component: ProductInfoPage,
  },
  {
    name: 'SalePage',
    component: SalePage,
  },
  {
    name: 'OrderHistoryPage',
    component: OrderHistoryPage,
  },
  {
    name: 'OrderHistoryInfoPage',
    component: OrderHistoryInfoPage,
  },
  {
    name: 'CreateOrderPage',
    component: CreateOrderPage,
  },
  {
    name: 'AddProductPage',
    component: AddProductPage,
  },
  {
    name: 'EditProductPage',
    component: EditProductPage,
  },
  {
    name: 'SellerProductsPage',
    component: SellerProductsPage,
  },
  {
    name: 'StyleSelectionPage',
    component: StyleSelectionPage,
  },
  {
    name: 'ForgotPasswordPage',
    component: ForgotPasswordPage,
  },
  {
    name: 'ForgotPasswordCode',
    component: ForgotPasswordCode,
  },
  {
    name: 'NewPasswordPage',
    component: NewPasswordPage,
  },
  {
    name: 'SaleStatsPage',
    component: SaleStatsPage,
  },
];
