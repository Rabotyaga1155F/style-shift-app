import {IRoute} from './navigation.types.ts';
import HomePage from '@/components/pages/home/Home.tsx';
import FavoritePage from '@/components/pages/favorite/Favorite.tsx';
import ChatPage from '@/components/pages/chat/Chat.tsx';
import ProfilePage from '@/components/pages/profile/Profile.tsx';
import SignIn from '@/components/pages/sign-in/SignIn.tsx';
import SignUp from '@/components/pages/sign-up/SignUp.tsx';
import ProductInfoPage from '@/components/pages/product-info/ProductInfo.tsx';
import SalePage from '@/components/pages/sale/Sale.tsx';
import OrderHistoryPage from '@/components/pages/order-history/OrderHistory.tsx';
import CreateOrderPage from '@/components/pages/create-order/CreateOrder.tsx';
import AddProductPage from '@/components/pages/add-product/AddProduct.tsx';
import EditProductPage from '@/components/pages/edit-product/EditProduct.tsx';
import SellerProductsPage from '@/components/pages/seller-products/SellerProducts.tsx';

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
    name: 'ChatPage',
    component: ChatPage,
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
];
