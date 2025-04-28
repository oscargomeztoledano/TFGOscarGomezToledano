const SPRITESHEETS = [
    {
        key: 'player_idle',
        path: 'assets/characters/1/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run',
        path: 'assets/characters/1/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump',
        path: 'assets/characters/1/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall',
        path: 'assets/characters/1/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit',
        path: 'assets/characters/1/Hit.png',
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
      console.log(`Spritesheet ${key} loaded from ${path}`)
    })
  }
  