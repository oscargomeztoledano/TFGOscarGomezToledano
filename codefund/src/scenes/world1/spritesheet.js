const SPRITESHEETS = [
    {
        key: 'player_idle',
        path: 'assets/world1/characters/1/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run',
        path: 'assets/world1/characters/1/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump',
        path: 'assets/world1/characters/1/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall',
        path: 'assets/world1/characters/1/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },

    {
        key: 'player_hit',
        path: 'assets/world1/characters/1/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    }
]
export const initSpritesheet = ({ load }) => {
    SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
      load.spritesheet(key, path, { frameWidth, frameHeight })
    })
  }
  