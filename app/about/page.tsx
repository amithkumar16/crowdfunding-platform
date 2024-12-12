import React from 'react';

const About = () => {
  return (
    <>
      <div>
        {/* Main Content */}
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Our Crowdfunding Platform</h1>
          <p className="text-xl mb-10 text-slate-200">
            Our platform connects creators with their fans to fund their passions and dreams. Here's a bit more about how it works:
          </p>

          {/* Section with GIFs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <img src="/man.gif" alt="Creator working" width={150} height={150} />
              <p className="font-semibold mt-3">Creators share their passion</p>
              <p className="text-slate-200">Creators pitch their ideas to attract fans and funding.</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/coin.gif" alt="Funding" width={150} height={150} />
              <p className="font-semibold mt-3">Fans contribute to dreams</p>
              <p className="text-slate-200">Fans support their favorite creators by making donations or purchasing products.</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/group.gif" alt="Community support" width={150} height={150} />
              <p className="font-semibold mt-3">Building a community</p>
              <p className="text-slate-200">A community of supporters helps creators grow by promoting and contributing to their campaigns.</p>
            </div>
          </div>

          {/* About Us */}
          <div className="max-w-4xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">How It Works</h2>
            <p className="text-lg text-slate-200 mb-4">
              Our platform allows creators to set up a campaign and share their journey. Fans can choose how to support their favorite creators—whether through donations or purchasing exclusive content. The more support a creator gets, the closer they get to their goals.
            </p>
            <p className="text-lg text-slate-200 mb-4">
              For creators, the platform offers a way to connect with their audience, showcase their work, and raise funds for their projects. For fans, it’s an opportunity to be part of something exciting and directly contribute to the success of a creator they admire.
            </p>
            <p className="text-lg text-slate-200 mb-6">
              The beauty of crowdfunding is that it’s a win-win: creators get the support they need, and fans get the satisfaction of knowing they helped make something amazing happen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
