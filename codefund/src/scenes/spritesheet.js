const SPRITESHEETS = [
    {
        key: 'player_idle',
        path: 'assets/characters/2/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run',
        path: 'assets/characters/2/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump',
        path: 'assets/characters/2/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall',
        path: 'assets/characters/2/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit',
        path: 'assets/characters/2/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_head',
        path: 'assets/characters/2/Head.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'checkpoint1',
        path: 'assets/Checkpoints/Checkpoint_Flag_Out2.png',
        frameWidth: 48,
        frameHeight: 48,
    },

]
export const initSpritesheet = ({ load }) => {
    SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
      load.spritesheet(key, path, { frameWidth, frameHeight })
    })
  }
  