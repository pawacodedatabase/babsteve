const LegalTerms = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">
          Welcome to <strong>BABSTEVE SOLAR</strong>! By accessing and using our website, you agree to the following
          terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
            <p className="text-gray-600">
              These Terms and Conditions ("Terms") govern your use of our website, products, and services. By accessing
              or using our website, you agree to be bound by these Terms. If you do not agree, please refrain from
              using our website.
            </p>
          </div>

          {/* Section 2: Products and Services */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Products and Services</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>All solar products are subject to availability and technical specifications.</li>
              <li>We reserve the right to modify pricing, features, or availability at any time without prior notice.</li>
              <li>Images and descriptions are for reference only—actual product appearance may vary slightly.</li>
            </ul>
          </div>

          {/* Section 3: Payment Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Payment Terms</h2>
            <p className="text-gray-600">
              Payments must be completed in full before your order is processed. We accept the following payment methods:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Bank Transfers</li>
              <li>Mobile Payment Options</li>
              <li>Cash on Delivery (where applicable)</li>
            </ul>
          </div>

          {/* Section 4: Order Processing and Delivery */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Order Processing and Delivery</h2>
            <p className="text-gray-600">
              Orders are typically processed and delivered within <strong>5–10 working days</strong> depending on your location.
              Delivery fees will be calculated during checkout. Large solar installations may require additional lead time.
            </p>
          </div>

          {/* Section 5: Returns and Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Returns and Refunds</h2>
            <p className="text-gray-600">
              Returns are accepted under the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Returns must be requested within 7 days of delivery.</li>
              <li>Items must be unused and in original packaging.</li>
              <li>Custom solar installations and used items are non-refundable unless defective.</li>
              <li>Return shipping costs are the responsibility of the customer unless the product is faulty.</li>
            </ul>
          </div>

          {/* Section 6: Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Use of Website</h2>
            <p className="text-gray-600">
              You agree not to misuse this website or attempt to gain unauthorized access to our systems. BABSTEVE SOLAR
              reserves the right to restrict or terminate access for violations of these Terms.
            </p>
          </div>

          {/* Section 7: Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Contact Us</h2>
            <p className="text-gray-600">
              For questions about these Terms, please contact us at:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:babstevesolar@gmail.com" className="text-[#00b1ed] font-bold">
                babstevesolar@gmail.com
              </a>
              <br />
              <strong>Phone:</strong>{' '}
              <a href="tel:+2348067679019" className="text-[#00b1ed] font-bold">
                +2348067679019
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-500 mt-8">
          Last updated: <span className="font-semibold">December 18, 2024</span>
        </p>
      </div>
    </div>
  );
};

export default LegalTerms;
