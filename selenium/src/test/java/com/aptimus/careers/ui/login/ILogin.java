package com.aptimus.careers.ui.login;

import com.aptimus.careers.dto.UserProfile.User;

public interface ILogin {

    public ILogin open ();

    public boolean doLogin ();

    public boolean doLogin (User user);

    public boolean closeLoginWindow ();
}
