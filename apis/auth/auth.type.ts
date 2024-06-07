/**
 * @param FormValues /{
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}
 */

export interface FormValues {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

/**
 * @param PostAuthLoginRes /{
  user: {
    id: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
  };
  accessToken: string;
  refreshToken: string;
}
 */

export interface PostAuthLoginRes {
  user: {
    id: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * @param PostAuthLoginReq /{
  email: string;
  password: string;
}
 */

export interface PostAuthLoginReq {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}
