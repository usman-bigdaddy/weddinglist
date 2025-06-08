import dbConnect from '@/lib/db';
import Guest from '@/models/Guest';

export default async function VerifyPage({ params }: { params: { otp: string } }) {
  await dbConnect();
  const guest = await Guest.findOne({ otp: params.otp });

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-pink-200">
        <div className="bg-pink-800 p-6 text-center">
          <h1 className="text-3xl font-serif text-pink-100">Verification Status</h1>
        </div>
        
        <div className="p-6 text-center">
          {guest ? (
            <>
              <h2 className="text-2xl font-serif text-pink-900 mb-4">
                {guest.fullName}
              </h2>
              <p className="text-pink-700 mb-2">
                Status: <span className={`font-bold ${guest.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {guest.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </p>
              <p className="text-pink-700">
                {guest.isVerified 
                  ? `Verified on ${guest.verifiedAt?.toLocaleString()}`
                  : 'Please wait for the host to verify your RSVP.'}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-serif text-pink-900 mb-4">
                Not Found
              </h2>
              <p className="text-pink-700">
                No RSVP found with this verification code.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}