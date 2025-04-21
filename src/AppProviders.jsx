import { AddressProvider } from "./contexts/AddressProvider";
import { CheckoutProvider } from "./contexts/CheckoutProvider";
import { OrderProvider } from "./contexts/OrderProvider";
import { PaymentProvider } from "./contexts/PaymentProvider";
import { UserProvider } from "./contexts/UserProvider";

export function AppProviders({ children }){
    return (
        <>
            <UserProvider>
                <AddressProvider>
                    <PaymentProvider>
                        <OrderProvider>
                            <CheckoutProvider>
                                {children}
                            </CheckoutProvider>
                        </OrderProvider>
                    </PaymentProvider>
                </AddressProvider>
            </UserProvider>
        </>
    );
};
