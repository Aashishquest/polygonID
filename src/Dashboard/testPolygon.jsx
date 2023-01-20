import {auth, resolver, protocol, loaders, circuits} from '@iden3/js-iden3-auth'

function ExampleComponent() {
  const reason = "Some reason for the authorization request";
  const audience = "https://example.com";
  const url = "https://example.com/auth";
  const messageToSign = "Some message to sign";

  const request = auth.createAuthorizationRequestWithMessage(reason, messageToSign,audience, url);

  const proofRequest = {
    id: 1,
    circuit_id: 'credentialAtomicQuerySig',
    rules: {
        query: {
        allowedIssuers: ['11AbuG9EKnWVXK1tooT2NyStQod2EnLhfccSajkwJA'],
        schema: {
            type: 'KYCCountryOfResidenceCredential',
            url: 'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld',
        },
        req: {
            countryCode: {
            $nin: [840, 120, 340, 509],
            },
        },
        },
    },
  };
  request.body.scope = [...scope, proofRequest];

  return (
    <div>
      {/* render some UI using the request and proofRequest variables */}
    </div>
  );
}
