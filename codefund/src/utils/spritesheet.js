const SPRITESHEETS = [
    {
        key: 'player_idle1',
        path: 'assets/characters/1/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run1',
        path: 'assets/characters/1/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump1',
        path: 'assets/characters/1/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall1',
        path: 'assets/characters/1/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit1',
        path: 'assets/characters/1/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_head1',
        path: 'assets/characters/1/Head.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_idle2',
        path: 'assets/characters/2/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run2',
        path: 'assets/characters/2/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump2',
        path: 'assets/characters/2/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall2',
        path: 'assets/characters/2/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit2',
        path: 'assets/characters/2/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_head2',
        path: 'assets/characters/2/Head.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_idle3',
        path: 'assets/characters/3/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run3',
        path: 'assets/characters/3/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump3',
        path: 'assets/characters/3/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall3',
        path: 'assets/characters/3/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit3',
        path: 'assets/characters/3/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_head3',
        path: 'assets/characters/3/Head.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_idle0',
        path: 'assets/characters/0/Idle.png',
        frameWidth: 32,
        frameHeight: 32, 
    },
    {
        key: 'player_run0',
        path: 'assets/characters/0/Run.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_jump0',
        path: 'assets/characters/0/Jump.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_fall0',
        path: 'assets/characters/0/Fall.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_hit0',
        path: 'assets/characters/0/Hit.png',
        frameWidth: 32,
        frameHeight: 32,
    },
    {
        key: 'player_head0',
        path: 'assets/characters/0/Head.png',
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
  