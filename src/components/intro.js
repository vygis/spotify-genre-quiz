import React from 'react';

const Intro = ({ questionCount }) => {
  return (
    <section>
      <p>
        <strong>
          Never judge a book by its cover, as the saying goes.
        </strong>
      </p>
      <p>
        Is that true in the world of music, though? Haven't we all seen countless cliché album covers that immediately tell what kind of music the artist is playing?
      </p>
      <p>
        How many hip-hop LP's are graced with snaps of tattooed muscular guys with gold chains?
        Heavy metal albums? Endless variations of ominous cloaked figures, toothed monsters, and skulls, with heavily stylysed band logos stamped on the top!
      </p>
      <p>
        Find out your album cover judging prowess by guessing the musical style of {questionCount} album covers, taken at random from the Spotify database.
      </p>
    </section>
  );
}

export default Intro;
