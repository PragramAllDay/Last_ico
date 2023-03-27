import React from "react";
import { useHorizontalScroll } from "../../lib/hooks/useHorizontalScroll";
import RoadmapItem from "./RoadmapItem";

const Roadmap = () => {
  const roadmap_items = [
    {
      roadmapTitle: "Phase 1",
      title: "Project creation Phase",
      info: [
        "Concept of the “Last idea”",
        "Team formation",
        "Website development",
        "Smart contract development",
        "Marketing campaign"
      ],
    },
    {
      roadmapTitle: "Phase 2",
      title: "Starting phase",
      info: [
        "Initial marketing Rollout",
        "Begin development of the LastNFTs ",
        "Begin development of the LastWallet",
        "Begin development of the LastSwap decentralized exchange",
        "Begin development of the LastBridge",
        "Integrate with other blockchain platforms",
        //"Begin working on community initiatives, including a social media campaign and partnerships with other blockchain projects"
      ],
    },

    {
      roadmapTitle: "Phase 3",
      title: "Presale Phase",
      info: [
        "Presale of the Last tokens",
        "Launch of the LastSwap system",
        "LastBridge test drive",
      ],
    },

    {
      roadmapTitle: "Phase 4",
      title: "Pre-Launch Phase",
      info: [
        "Start of LastBridge work ",
        "Launch of the LastWallet",
        "Digital/Physical Events",
        "U&UK Business development",
        "Introduce new features to LastSwap, such as limit orders and margin trading",
        "Launch the mobile version of the LastWallet",
        "Launch educational resources to help users understand blockchain technology and the LastChain ecosystem",
        "Launch the mobile version of the LastWallet",
        "Launch educational resources to help users understand blockchain technology and the LastChain ecosystem"
      ],
    },
    {
      roadmapTitle: "Phase 5",
      title: "Launch Phase",
      info: [
        "Public sale for Last testers",
        "Media Drop & Real World Event with invited crypto influencers ",
        "Aggressive Marketing ",
        "LastNFTs drop ",
        "Airdrop LAST tokens for alpha testers -Continue to improve the LastChain ecosystem by adding new features and capabilities",
        "Work on expanding the ecosystem by partnering with more blockchain projects and service providers",
        "Explore opportunities to integrate with traditional financial systems and other emerging technologies",
        "Create a LastChain developer program to encourage innovation and support the growth of the ecosystem",
        "Explore opportunities to expand globally by entering new markets and working with local communities.",
        "Launch an updated version of LastChain with improved features and capabilities",
      ],
    }
  ];

  const scrollRef = useHorizontalScroll();

  return (
    <section id="roadmap" className="roadmap-area pt-130 pb-130">
      <div className="container custom-container-two">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-8">
            <div className="section-title text-center mb-60">
              <span className="sub-title">OUr Roadmap</span>
              <h2 className="title">
                Last Strategy and <br /> Project <span>Plan</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div
              className="bt-roadmap_x bt-roadmap-scrollbar"
              ref={scrollRef}
              style={{ overflow: "auto" }}
            >
              <div className="bt-roadmap-wrap">
                {roadmap_items.map((x, index) => (
                  <RoadmapItem key={index} item={x} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
