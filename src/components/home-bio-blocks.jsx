import React from "react";

export const BioBlocks = () => {
  const blocks = [
    {
      title: "Award Winning Tutor",
      points: [
        "Tutor of the Summer Award at the University of Arizona's 2016 New Start Summer Program",
        "Tutor of the Month Award at Pima Community College's West Campus Learning Center",
      ],
    },
    {
      title: "B.S. + M.S. in Engineering",
      points: [
        "B.S. in Mechanical Engineering from the University of Arizona",
        "M.S in Electrical and Computer Engineering from the Unviersity of Arizona",
        "Currenlty pursuing a career in Software Development",
      ],
    },
    {
      title: "2+ years of STEM Tutoring",
      points: [
        "1.5 years tutoring all levels of Math and Physics at Pima Community College's West Campus Learning Center",
        "Summers tutoring math at the Univeristy of Arizona",
        "Private individual STEM tutoring throughout the years",
      ],
    },
    {
      title: "Local Community Leader",
      points: [
        "Community Organizer for over 4 years",
        "Currently the Communications and Development lead at ScholarshipsA-Z",
        "Has led anti-violence work at the University of Arizona",
      ],
    },
  ];
  return (
    <div className="bio-block-wrapper">
      <div className="bio-block-flex">
        {blocks.map((value, index) => {
          return <SingleBioBlock key={"bio-block" + index}title={value.title} points={value.points} />;
        })}
      </div>
    </div>
  );
};

const SingleBioBlock = (props) => {
  const { title, points } = props;

  return (
    <div className="single-bio-block-outer">
      <h3>
        <u>{title}</u>
      </h3>

      <ul id="secondary">
        {points.map((value, index) => {
          return <li key={"sub" + index}>{value}</li>;
        })}
      </ul>
    </div>
  );
};
