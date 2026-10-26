import { redirect } from 'next/navigation';

// Paid plans and sponsorship packages are not being offered during the product-validation phase.
// Keep old links working without advertising unlaunched prices or subscriptions.
export default function PartnerPage() {
  redirect('/');
}
